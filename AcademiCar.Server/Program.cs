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
using Azure.Security.KeyVault.Certificates;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IGlobalService, GlobalService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddHttpContextAccessor();

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

var env = builder.Environment;
var metadataFilePath = Path.Combine(env.ContentRootPath, "metadata.xml");

var vaultUri = new Uri("https://keyvaultacademicar.vault.azure.net/");

if (!builder.Environment.IsDevelopment())
{
    builder.Configuration.AddAzureKeyVault(vaultUri, new DefaultAzureCredential());

    var secrets = new[] { "DBHOST", "DBPASSWORD", "DBUSER" };
    foreach (var secret in secrets)
    {
        var secretValue = builder.Configuration[secret];
        builder.Configuration[secret] = secretValue;
    }

    builder.Services.AddDbContext<PostgresDbContext>(options =>
        options.UseNpgsql(
            $"Host={builder.Configuration["DBHOST"]};Database={builder.Configuration["DBNAME"]};Username={builder.Configuration["DBUSER"]};Password={builder.Configuration["DBPASSWORD"]}"));
}
else
{
    builder.Services.AddDbContext<PostgresDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
}

var enableSaml2 = builder.Configuration.GetValue<bool>("EnableSaml2");

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
            var fhCertName = builder.Configuration["SustainsysSaml2:ServiceCertificates:0:FhCert"];
            var encryptionCert = builder.Configuration["SustainsysSaml2:ServiceCertificates:0:EncryptionCert"];
            var certificateClient = new CertificateClient(vaultUri, new DefaultAzureCredential());
            var fhCertificate = certificateClient.DownloadCertificate(fhCertName);
            var encryptionCertificate = certificateClient.DownloadCertificate(encryptionCert);
            
            
            options.SPOptions.EntityId = new EntityId(builder.Configuration["SustainsysSaml2:Issuer"]);

            var fhCertPath = builder.Configuration["SustainsysSaml2:ServiceCertificates:0:FhFileName"];
            var spCertPath = builder.Configuration["SustainsysSaml2:ServiceCertificates:0:SpFileName"];
            var spSignCertPath = builder.Configuration["SustainsysSaml2:ServiceCertificates:0:SpSignFileName"];
            var certPassword = builder.Configuration["SustainsysSaml2:ServiceCertificates:0:Password"];
            var signCertPassword = builder.Configuration["SustainsysSaml2:ServiceCertificates:0:SignPassword"];
//            var spCert = new X509Certificate2(spCertPath, certPassword);
//            var spSignCert = new X509Certificate2(spSignCertPath, signCertPassword);
            var fhCert = new X509Certificate2(fhCertificate);
            var spCert = new X509Certificate2(encryptionCertificate);
            
            options.SPOptions.ServiceCertificates.Add(
                new ServiceCertificate
                {
                    Certificate = fhCert,
                    Use = CertificateUse.Signing
                }
            );
            
            options.SPOptions.ServiceCertificates.Add(
                new ServiceCertificate
                {
                    Certificate = spCert,
                    Use = CertificateUse.Encryption
                }
            );
            
            var idp = new IdentityProvider(
                new EntityId(builder.Configuration["SustainsysSaml2:Idp:EntityId"]),
                options.SPOptions)
            {
                MetadataLocation = metadataFilePath,
            };

            idp.AllowUnsolicitedAuthnResponse = true;
            idp.WantAuthnRequestsSigned = true;
            options.SPOptions.OutboundSigningAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";

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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

static void ApplyMigrations(IHost app)
{
    using IServiceScope scope = app.Services.CreateScope();
    PostgresDbContext db = scope.ServiceProvider.GetRequiredService<PostgresDbContext>();

    db.Database.Migrate();
}