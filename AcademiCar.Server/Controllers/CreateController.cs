using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/create")]
public class CreateController : ControllerBase
{
    private readonly IGlobalService _globalService;
    
    public CreateController(IGlobalService globals)
    {
        _globalService = globals;
    }
    
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTripById(int id)
    {
        Trip? trip = await _globalService.TripService.Get(id);

        Console.WriteLine("Get Trip By ID");
        Console.WriteLine($"{id}");
        Console.WriteLine($"{trip}");
        
        if (trip == null)
            return NotFound();
        
        return Ok(trip);
    }
}