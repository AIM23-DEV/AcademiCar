using System.Net.WebSockets;
using Microsoft.EntityFrameworkCore;
using Azure.Identity;
using AcademiCar.Server.DAL.UnitOfWork;
using Sustainsys.Saml2;
using Sustainsys.Saml2.AspNetCore2;
using Sustainsys.Saml2.Metadata;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using AcademiCar.Server;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseWebSockets();
app.UseWebSocketMiddleware();

app.MapFallbackToFile("/index.html");

app.Run();

static void ApplyMigrations(IHost app)
{
    using IServiceScope scope = app.Services.CreateScope();
    PostgresDbContext db = scope.ServiceProvider.GetRequiredService<PostgresDbContext>();
    
    // db.Database.EnsureDeleted();
    db.Database.Migrate();
}

public class WebSocketMiddleware
{
    private readonly RequestDelegate _next;

    public WebSocketMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            await HandleWebSocketAsync(context, webSocket);
        }
        else
        {
            await _next(context);
        }
    }

    private async Task HandleWebSocketAsync(HttpContext context, WebSocket webSocket)
    {
        var buffer = new byte[1024 * 4];
        WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        while (!result.CloseStatus.HasValue)
        {
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            // Broadcast the message to all connected clients or handle it as needed
            await webSocket.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes("Echo: " + message)), result.MessageType, result.EndOfMessage, CancellationToken.None);
            result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        }
        await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
    }
}

public static class WebSocketMiddlewareExtensions
{
    public static IApplicationBuilder UseWebSocketMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<WebSocketMiddleware>();
    }
}