using Microsoft.EntityFrameworkCore;
using Azure.Identity;
using AcademiCar.Server.DAL.UnitOfWork;
using Sustainsys.Saml2;
using Sustainsys.Saml2.AspNetCore2;
using Sustainsys.Saml2.Metadata;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using AcademiCar.Server;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Repositories;
using AcademiCar.Server.Services.ServiceImpl;
using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Hub;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IGlobalService, GlobalService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddHttpContextAccessor(); 

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var env = builder.Environment;
var metadataFilePath = Path.Combine(env.ContentRootPath, "metadata.xml");

// Configure database context
if (!builder.Environment.IsDevelopment())
{
    var vaultUri = $"https://keyvaultacademicar.vault.azure.net/";
    builder.Configuration.AddAzureKeyVault(new Uri(vaultUri), new DefaultAzureCredential());
    
    var secrets = new[] { "DBHOST", "DBPASSWORD", "DBUSER" };
    foreach (var secret in secrets)
    {
        var secretValue = builder.Configuration[secret];
        builder.Configuration[secret] = secretValue;
    }
    builder.Services.AddDbContext<PostgresDbContext>(options =>
        options.UseNpgsql($"Host={builder.Configuration["DBHOST"]};Database={builder.Configuration["DBNAME"]};Username={builder.Configuration["DBUSER"]};Password={builder.Configuration["DBPASSWORD"]}"));
}
else
{
    builder.Services.AddDbContext<PostgresDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
}
// Conditional SAML2 Setup
var enableSaml2 = builder.Configuration.GetValue<bool>("EnableSaml2");
var useSingleIdP = builder.Configuration.GetValue<bool>("UseSingleIdP");

if (enableSaml2)
{
    builder.Services.AddAuthentication(options =>
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = Saml2Defaults.Scheme;
        })
        .AddCookie()
        .AddSaml2(options =>
        {
            options.SPOptions.EntityId = new EntityId(builder.Configuration["SustainsysSaml2:Issuer"]);

            var idp = new IdentityProvider(
                new EntityId(builder.Configuration["SustainsysSaml2:Idp:EntityId"]),
                options.SPOptions)
            {
                MetadataLocation = metadataFilePath
            };

            /*var certPath = builder.Configuration["SustainsysSaml2:ServiceCertificates:0:FileName"];
            var certPassword = builder.Configuration["SustainsysSaml2:ServiceCertificates:0:Password"];
            idp.SigningKeys.AddConfiguredKey(new X509Certificate2(certPath, certPassword));
    */
            options.IdentityProviders.Add(idp);
        });
}

// Add authorization policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireClaim(ClaimTypes.Role, "admin"));
    options.AddPolicy("User", policy => policy.RequireClaim(ClaimTypes.Role, "user"));
});

var app = builder.Build();

ApplyMigrations(app);

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.Use(async (context, next) =>
    {
        if (context.Request.Path.StartsWithSegments("/swagger") ||
            context.Request.Path.StartsWithSegments("/swagger-ui"))
        {
            // Allow anonymous access to Swagger in development
            var user = new ClaimsPrincipal(new ClaimsIdentity());
            context.User = user;
        }
        await next();
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/chat/chathub");

app.MapFallbackToFile("/index.html");

app.Run();

static void ApplyMigrations(IHost app)
{
    using IServiceScope scope = app.Services.CreateScope();
    PostgresDbContext db = scope.ServiceProvider.GetRequiredService<PostgresDbContext>();
    //db.Database.EnsureDeleted();
    db.Database.Migrate();
}