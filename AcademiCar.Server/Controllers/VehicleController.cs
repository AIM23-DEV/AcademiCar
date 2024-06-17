using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.Response;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/vehicle")]
public class VehicleController : ControllerBase
{
    private readonly IGlobalService _globalService;
    private readonly PostgresDbContext _context;

    public VehicleController(IGlobalService globals, PostgresDbContext context)
    {
        _globalService = globals;
        _context = context;
    }

    
    [HttpGet("{id}", Name = "GetVehiclebyId")]
    public async Task<ActionResult<Vehicle>> GetTestByIdAsync(int id)
    {
        var entry = await _context.Vehicles.FindAsync(id);
        if (entry == null)
        {
            return NotFound();
        }

        return entry;
    }

    [HttpPost("Add")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> AddVehicle([Required][FromBody] Vehicle vehicle)
        => await _globalService.VehicleService.Create(vehicle);
}
