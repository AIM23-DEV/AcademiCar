using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/create")]
public class CreateController : ControllerBase
{
    private readonly IGlobalService _globalService;
    private readonly Random _random;

    public CreateController(IGlobalService globals)
    {
        _globalService = globals;
        _random = new Random();
    }


    #region Helper Functions

    private async Task<int> _GetNewAddressID()
    {
        int newId = _random.Next(1, 999999999);
        Address? address = await _globalService.AddressService.Get(newId);
        if (address == null) return newId;
        
        return await _GetNewAddressID();
    }

    private async Task<int> _GetNewTripID()
    {
        int newId = _random.Next(1, 999999999);
        Trip? address = await _globalService.TripService.Get(newId);
        if (address == null) return newId;
        
        return await _GetNewTripID();
    }
    
    #endregion
    
    
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

        try
        {
            Address? existingAddress =
                _globalService.AddressService.GetByStreetAndPlace(newAddress.Street, newAddress.Place);
            if (existingAddress != null) return Ok(existingAddress);

            newAddress.ID = await _GetNewAddressID();
            await _globalService.AddressService.Create(newAddress);
            return Ok(newAddress);
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }
       
    [HttpPost ("trip")]
    public async Task<IActionResult> CreateTrip([FromBody] Trip newTrip)
    {
        if (newTrip == null) return BadRequest();

        try
        {
            newTrip.ID = await _GetNewTripID();
            await _globalService.TripService.Create(newTrip);

            return Ok(newTrip);
        }
        catch (Exception e)
        {
            return BadRequest();
        }
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
    
    [HttpPut("groupchat")]
    public async Task<IActionResult> UpdateGroupChat([FromBody] GroupChat groupChat)
    {
        ActionResultResponseModel result = await _globalService.GroupChatService.Create(groupChat);
        if (!result.IsSuccess) return Conflict(groupChat);
        
        GroupChat? insertedGroupChat = await _globalService.GroupChatService.Get(groupChat.ID);
        if (insertedGroupChat == null) return Forbid();
        
        return Ok(insertedGroupChat);
    }
    
    [HttpPost("groupchatUser")]
    public async Task<IActionResult> CreateGroupChatUser([FromBody] GroupChatUser groupChatUser)
    {
        ActionResultResponseModel result = await _globalService.GroupChatUserService.Create(groupChatUser);
        if (!result.IsSuccess) return Conflict(groupChatUser);
        
        GroupChat? insertedGroupChat = await _globalService.GroupChatService.Get(groupChatUser.ID);
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

        existingTrip.Title = updatedTrip.Title;
        existingTrip.FK_Driver = updatedTrip.FK_Driver;
        existingTrip.FK_StartAddress = updatedTrip.FK_StartAddress;
        existingTrip.FK_EndAddress = updatedTrip.FK_EndAddress;
        existingTrip.StartTime = updatedTrip.StartTime;
        existingTrip.EndTime = updatedTrip.EndTime;
        existingTrip.FK_Vehicle = updatedTrip.FK_Vehicle;
        existingTrip.AvailableSeats = updatedTrip.AvailableSeats;
        existingTrip.Price = updatedTrip.Price;
        existingTrip.PaymentMethod = updatedTrip.PaymentMethod;
        existingTrip.Status = existingTrip.Status;

        await _globalService.TripService.Update(existingTrip);

        return Ok(existingTrip);
    }
}