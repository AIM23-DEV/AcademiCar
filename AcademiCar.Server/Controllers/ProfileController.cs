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

    // Edit Page
    [HttpPut("user/update")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    public async Task<IActionResult> UpdateUser([Required] [FromBody] User user)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        ActionResultResponseModel result = await _globalService.UserService.Update(user);
        if (!result.IsSuccess)
        {
            result.Message = "Failed to update user";
            return BadRequest(result);
        }

        result.Message = "User updated successfully";
        return Ok(result);
    }

    [HttpPut("address/update")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    public async Task<IActionResult> UpdateUserAddress([Required] [FromBody] Address address)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        ActionResultResponseModel result = await _globalService.AddressService.Update(address);
        if (!result.IsSuccess)
        {
            result.Message = "Failed to update address";
            return BadRequest(result);
        }

        result.Message = "Address updated successfully";
        return Ok(result);
    }

    // Vehicle Page
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
    public async Task<IActionResult> AddVehicle([Required] [FromBody] VehicleDto vehicleDto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        var vehicle = new Vehicle
        {
            FK_OwnerUser = vehicleDto.FK_OwnerUser,
            Type = vehicleDto.Type,
            Seats = vehicleDto.Seats,
            Color = vehicleDto.Color,
            PictureSrc = vehicleDto.PictureSrc,
            BrandModel = vehicleDto.BrandModel,
            FuelConsumption = vehicleDto.FuelConsumption,
            LicensePlate = vehicleDto.LicensePlate,
            FuelType = vehicleDto.FuelType,
            HasAC = vehicleDto.HasAC,
            HasLed = vehicleDto.HasLed,
            HasVehicleInspection = vehicleDto.HasVehicleInspection,
            HasAutomatic = vehicleDto.HasAutomatic,
            HasSkiBag = vehicleDto.HasSkiBag,
            HasLeather = vehicleDto.HasLeather,
            HasSeatHeating = vehicleDto.HasSeatHeating,
            HasCruiseControl = vehicleDto.HasCruiseControl,
            HasBikeRack = vehicleDto.HasBikeRack,
            HasHandLuggageSpace = vehicleDto.HasHandLuggageSpace,
            HasMountingOnRoof = vehicleDto.HasMountingOnRoof,
            HasAnimalSpace = vehicleDto.HasAnimalSpace,
            HasSuitcaseSpace = vehicleDto.HasSuitcaseSpace,
            HasSkiSpace = vehicleDto.HasSkiSpace,
            HasPlantSpace = vehicleDto.HasPlantSpace,
            HasOtherSpace = vehicleDto.HasOtherSpace
        };

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
    public async Task<IActionResult> UpdateVehicle([Required] [FromBody] UpdateVehicleDto vehicleDto)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        var vehicle = new Vehicle
        {
            ID = vehicleDto.ID,
            FK_OwnerUser = vehicleDto.FK_OwnerUser,
            Type = vehicleDto.Type,
            Seats = vehicleDto.Seats,
            Color = vehicleDto.Color,
            PictureSrc = vehicleDto.PictureSrc,
            BrandModel = vehicleDto.BrandModel,
            FuelConsumption = vehicleDto.FuelConsumption,
            LicensePlate = vehicleDto.LicensePlate,
            FuelType = vehicleDto.FuelType,
            HasAC = vehicleDto.HasAC,
            HasLed = vehicleDto.HasLed,
            HasVehicleInspection = vehicleDto.HasVehicleInspection,
            HasAutomatic = vehicleDto.HasAutomatic,
            HasSkiBag = vehicleDto.HasSkiBag,
            HasLeather = vehicleDto.HasLeather,
            HasSeatHeating = vehicleDto.HasSeatHeating,
            HasCruiseControl = vehicleDto.HasCruiseControl,
            HasBikeRack = vehicleDto.HasBikeRack,
            HasHandLuggageSpace = vehicleDto.HasHandLuggageSpace,
            HasMountingOnRoof = vehicleDto.HasMountingOnRoof,
            HasAnimalSpace = vehicleDto.HasAnimalSpace,
            HasSuitcaseSpace = vehicleDto.HasSuitcaseSpace,
            HasSkiSpace = vehicleDto.HasSkiSpace,
            HasPlantSpace = vehicleDto.HasPlantSpace,
            HasOtherSpace = vehicleDto.HasOtherSpace
        };

        ActionResultResponseModel result = await _globalService.VehicleService.Update(vehicle);
        if (!result.IsSuccess)
        {
            result.Message = "Failed to update vehicle";
            return BadRequest(result);
        }

        result.Message = "Vehicle updated successfully";
        return Ok(result);
    }



    [HttpDelete("vehicles/{vehicleId}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    public async Task<IActionResult> DeleteVehicle(int vehicleId)
    {
        ActionResultResponseModel result = await _globalService.VehicleService.Delete(vehicleId);
        if (!result.IsSuccess)
        {
            result.Message = "Failed to delete vehicle";
            return BadRequest(result);
        }

        result.Message = "Vehicle deleted successfully";
        return Ok(result);
    }
}