using Microsoft.EntityFrameworkCore;
using Azure.Identity;
using AcademiCar.Server.DAL.UnitOfWork;
using Sustainsys.Saml2;
using Sustainsys.Saml2.AspNetCore2;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Xml.Linq;
using AcademiCar.Server;
using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Authentication;
using Sustainsys.Saml2.Metadata;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IGlobalService, GlobalService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

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

// Add identity services
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<PostgresDbContext>()
    .AddDefaultTokenProviders();

// Add authentication services
builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme; // Use Cookie as the default challenge scheme for now
    })
    .AddCookie(options =>
    {
        options.LoginPath = "/api/user/adminlogin";
        options.LogoutPath = "/api/user/logout";  
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    });

// Conditional SAML2 Setup
var enableSaml2 = builder.Configuration.GetValue<bool>("EnableSaml2");
var useSingleIdP = builder.Configuration.GetValue<bool>("UseSingleIdP");

if (enableSaml2)
{
    builder.Services.AddAuthentication()
        .AddSaml2(options =>
        {
            options.SPOptions.EntityId = new EntityId("https://academicar-dev.azurewebsites.net/Saml2");
            options.SPOptions.ReturnUrl = new Uri("https://academicar-dev.azurewebsites.net/Saml2/Acs");

            if (useSingleIdP)
            {
                // Single IdP configuration
                var entityId = builder.Configuration["Saml2:SingleIdP:EntityId"];
                var ssoUrl = builder.Configuration["Saml2:SingleIdP:SingleSignOnServiceUrl"];
                var certificate = builder.Configuration["Saml2:SingleIdP:SigningCertificate"];

                var idp = new IdentityProvider(new EntityId(entityId), options.SPOptions)
                {
                    LoadMetadata = false,
                    SingleSignOnServiceUrl = new Uri(ssoUrl)
                };

                var key = new X509Certificate2(Convert.FromBase64String(certificate));
                idp.SigningKeys.AddConfiguredKey(key);

                options.IdentityProviders.Add(idp);
            }
            else
            {
                // Multiple IdPs configuration
                var metadataUrl = "https://eduid.at/md/aconet-registered.xml";
                var httpClient = new HttpClient();
                var metadataXml = httpClient.GetStringAsync(metadataUrl).Result;

                var metadataDoc = XDocument.Parse(metadataXml);
                var ns = metadataDoc.Root.Name.Namespace;

                foreach (var entity in metadataDoc.Descendants(ns + "EntityDescriptor"))
                {
                    var idpDescriptor = entity.Descendants(ns + "IDPSSODescriptor").FirstOrDefault();
                    if (idpDescriptor != null)
                    {
                        var entityId = entity.Attribute("entityID")?.Value;
                        var ssoService = idpDescriptor.Descendants(ns + "SingleSignOnService").FirstOrDefault();
                        var ssoUrl = ssoService?.Attribute("Location")?.Value;

                        if (!string.IsNullOrEmpty(entityId) && !string.IsNullOrEmpty(ssoUrl))
                        {
                            var idp = new IdentityProvider(new EntityId(entityId), options.SPOptions)
                            {
                                LoadMetadata = false,
                                SingleSignOnServiceUrl = new Uri(ssoUrl)
                            };

                            var keys = idpDescriptor.Descendants(ns + "KeyDescriptor")
                                                    .Where(k => k.Attribute("use")?.Value == "signing" || k.Attribute("use") == null)
                                                    .Select(k => k.Descendants(ns + "X509Certificate").FirstOrDefault()?.Value)
                                                    .Where(c => !string.IsNullOrEmpty(c))
                                                    .Select(c => new X509Certificate2(Convert.FromBase64String(c)));

                            foreach (var key in keys)
                            {
                                idp.SigningKeys.AddConfiguredKey(key);
                            }

                            options.IdentityProviders.Add(idp);
                        }
                    }
                }
            }
        });

    // Ensure SAML2 is the default challenge scheme if enabled
    builder.Services.Configure<AuthenticationOptions>(options =>
    {
        options.DefaultChallengeScheme = Saml2Defaults.Scheme;
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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
return;

static void ApplyMigrations(IHost app)
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<PostgresDbContext>();
    db.Database.Migrate();
}
