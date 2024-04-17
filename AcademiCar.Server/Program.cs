using AcademiCar.Server.DAL;
using Microsoft.EntityFrameworkCore;
using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

if (!builder.Environment.IsDevelopment())
{
    var vaultUri = $"https://keyvaultacademicar.vault.azure.net/";
    builder.Configuration.AddAzureKeyVault(new Uri(vaultUri), new DefaultAzureCredential());
    
    var secrets = new[] { "DBPASSWORD", "DBUSER" };
    foreach (var secret in secrets)
    {
        var secretValue = builder.Configuration[secret];
        builder.Configuration[secret] = secretValue;
    }
}
else
{
    builder.Services.AddDbContext<PostgresDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
}

var app = builder.Build();

ApplyMigrations(app);

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

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