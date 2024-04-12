using AcademiCar.Server.DAL;
using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly PostgresDbContext _context;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, PostgresDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
                })
                .ToArray();
        }

        [HttpGet("TestTableEntries/{id}", Name = "GetDbEntry")]
        public async Task<ActionResult<TestTable>> GetTestByIdAsync(int id)
        {
            var entry = await _context.TestTableEntries.FindAsync(id);
            if (entry == null)
            {
                return NotFound();
            }

            return entry;
        }
        
        [HttpPost]
        public async Task<ActionResult<TestTable>> CreateTestEntryAsync(TestTable newEntry)
        {
            _context.TestTableEntries.Add(newEntry);
            await _context.SaveChangesAsync();
            
            return CreatedAtRoute("GetDbEntry", new { id = newEntry.Id }, newEntry);
        }
    }
}