using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
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
    
    
    [HttpGet ("{id}")]
    public async Task<IActionResult> GetTripById(string id)
    {
        int idAsInt = int.Parse(id);
        Trip? trip = await _globalService.TripService.Get(idAsInt);
        if (trip == null) return NotFound();
        
        return Ok(trip);
    }
    
    [HttpGet ("address/{id}")]
    public async Task<IActionResult> GetAddressById(string id)
    {
        int idAsInt = int.Parse(id);
        Address? address = await _globalService.AddressService.Get(idAsInt);
        if (address == null) return NotFound();
        
        return Ok(address);
    }
    
    [HttpGet ("vehicle/{vehicleId}")]
    public async Task<IActionResult> GetVehicleById(string vehicleId)
    {
        int vehicleIdAsInt = int.Parse(vehicleId);
        Vehicle? vehicle = await _globalService.VehicleService.Get(vehicleIdAsInt);
        if (vehicle == null) return NotFound();
        
        return Ok(vehicle);
    }

    [HttpGet ("vehicles/{driverId}")]
    public async Task<IActionResult> GetVehiclesByDriverId(string driverId)
    {
        List<Vehicle>? vehicles = await _globalService.VehicleService.GetVehiclesByUserId(driverId);
        if (vehicles == null) return NotFound();
        
        return Ok(vehicles);
    }

    
    [HttpPost ("address")]
    public async Task<IActionResult> CreateAddress([FromBody] Address newAddress)
    {
        if (newAddress == null) return BadRequest();

        await _globalService.AddressService.Create(newAddress);

        Address? insertedAddress = _globalService.AddressService.GetByStreetAndPlace(newAddress.Street, newAddress.Place);
        if (insertedAddress == null) return Conflict();
        
        return Ok(insertedAddress);
    }
        
    [HttpPost ("trip")]
    public async Task<IActionResult> CreateTrip([FromBody] Trip newTrip)
    {
        if (newTrip == null) return BadRequest();

        await _globalService.TripService.Create(newTrip);

        Trip? insertedTrip = _globalService.TripService.GetByTitleAndDriverAndStatus(newTrip.Title, newTrip.FK_Driver, newTrip.Status);
        if (insertedTrip == null) return Conflict();
        
        return Ok(insertedTrip);
    }
    
    [HttpPost("groupchat")]
    public async Task<IActionResult> CreateGroupChat([FromBody] GroupChat groupChat)
    {
        ActionResultResponseModel result = await _globalService.GroupChatService.Create(groupChat);
        if (!result.IsSuccess) return Conflict(groupChat);
        
        GroupChat? insertedGroupChat = await _globalService.GroupChatService.Get(groupChat.ID);
        if (insertedGroupChat == null) return Forbid();
        
        return Ok(insertedGroupChat);
    }
    
    
    [HttpPut ("{id}")]
    public async Task<IActionResult> UpdateTrip(string id, [FromBody] Trip updatedTrip)
    {
        int idAsInt = int.Parse(id);
        if (updatedTrip?.ID != idAsInt) return BadRequest();

        Trip? existingTrip = await _globalService.TripService.Get(idAsInt);
        if (existingTrip == null) return NotFound();

        // TODO also update FKs of addresses and vehicle...
        existingTrip.Title = updatedTrip.Title;
        existingTrip.StartTime = updatedTrip.StartTime;
        existingTrip.EndTime = updatedTrip.EndTime;
        existingTrip.AvailableSeats = updatedTrip.AvailableSeats;
        existingTrip.Price = updatedTrip.Price;
        existingTrip.PaymentMethod = updatedTrip.PaymentMethod;
        existingTrip.Status = existingTrip.Status;

        await _globalService.TripService.Update(existingTrip);

        return NoContent();
    }
}