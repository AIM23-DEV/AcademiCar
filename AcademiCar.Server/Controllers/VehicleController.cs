using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.Services.Response;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/vehicle")]
public class VehicleController : ControllerBase
{
    private readonly IGlobalService _globalService;
    private readonly IVehicleRepository _vehicleRepository;

    public VehicleController(IGlobalService globals, IVehicleRepository vehicleRepository)
    {
        _globalService = globals;
        _vehicleRepository = vehicleRepository;
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Vehicle>> GetTestByIdAsync(int id)
    {
        Vehicle? vehicle = await _globalService.VehicleService.Get(id);
        if (vehicle == null)
        {
            return NotFound();
        }

        return Ok(vehicle);
    }

    [HttpGet("vehicles/{userId}")]
    public async Task<ActionResult<List<Vehicle>>> GetVehiclesWithUseId(string userId)
    {
        IEnumerable<Vehicle> vehicles = await _vehicleRepository.GetVehiclesWithUseId(userId);

        if (!vehicles.Any())
        {
            return NotFound();
        }

        return Ok(vehicles);
    }
    
    
    
    [HttpPost("Add")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    public async Task<IActionResult> AddVehicle([Required] [FromBody] Vehicle vehicle)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var result = await _globalService.VehicleService.Create(vehicle);

        if (result.IsSuccess)
        {
            return Ok(new ActionResultResponseModel { IsSuccess = true, Message = "Vehicle added successfully" });
        }
        else
        {
            return BadRequest(new ActionResultResponseModel { IsSuccess = false, Message = "Failed to add vehicle" });
        }
    }
}