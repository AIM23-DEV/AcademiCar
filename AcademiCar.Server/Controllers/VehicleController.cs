using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.Controllers;

public class VehicleController : BaseController<Vehicle>
{
    private IGlobalService _globalService;
    private readonly PostgresDbContext _context;

    public VehicleController(IGlobalService globals, IHttpContextAccessor accessor, PostgresDbContext context)
        : base(globals.VehicleService, accessor)
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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserController.ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> AddVehicle([Required][FromBody] Vehicle vehicle)
        => await _globalService.VehicleService.Create(vehicle);
}
