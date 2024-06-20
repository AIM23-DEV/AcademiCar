using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/profile")]
public class ProfileController : ControllerBase
{
    private readonly IGlobalService _globalService;
    
    public ProfileController(IGlobalService globals)
    {
        _globalService = globals;
    }

    [HttpGet("vehicle/{vehicleId}")]
    public async Task<IActionResult> GetVehicleById(string vehicleId)
    {
        int vehicleIdAsInt = int.Parse(vehicleId);
        Vehicle? vehicle = await _globalService.VehicleService.Get(vehicleIdAsInt);
        if (vehicle == null) return NotFound("No vehicle found with id " + vehicleIdAsInt);

        return Ok(vehicle);
    }
    
    [HttpGet("vehicles/{userId}")]
    public async Task<IActionResult> GetVehiclesByUserId(string userId)
    {
        List<Vehicle> vehicles = await _globalService.VehicleService.GetVehiclesByUserId(userId);
        if (vehicles.Count == 0) return NotFound("User has no vehicles");

        return Ok(vehicles);
    }
    
    [HttpPost("vehicles/add")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    public async Task<IActionResult> AddVehicle([Required] [FromBody] Vehicle vehicle)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        ActionResultResponseModel result = await _globalService.VehicleService.Create(vehicle);
        if (!result.IsSuccess)
        {
            result.Message = "Failed to add vehicle";
            return BadRequest(result);
        }

        result.Message = "Vehicle added successfully";
        return Ok(result);
    }
    
    [HttpPut("vehicles/update")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    public async Task<IActionResult> UpdateVehicle([Required] [FromBody] Vehicle vehicle)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        ActionResultResponseModel result = await _globalService.VehicleService.Update(vehicle);
        if (!result.IsSuccess)
        {
            result.Message = "Failed to update vehicle";
            return BadRequest(result);
        }

        result.Message = "Vehicle updated successfully";
        return Ok(result);
    }
    
    [HttpDelete("vehicles/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    public async Task<IActionResult> DeleteVehicle(int id)
    {
        ActionResultResponseModel result = await _globalService.VehicleService.Delete(id);
        if (!result.IsSuccess)
        {
            result.Message = "Failed to delete vehicle";
            return BadRequest(result);
        }
        
        result.Message = "Vehicle deleted successfully";
        return Ok(result);
    }
}