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
    
    
    [HttpGet ("{id}")]
    public async Task<IActionResult> GetTripById(string id)
    {
        int idAsInt = int.Parse(id);
        Trip? trip = await _globalService.TripService.Get(idAsInt);
        
        if (trip == null)
            return NotFound();
        
        return Ok(trip);
    }
    
    [HttpGet ("address/{id}")]
    public async Task<IActionResult> GetAddressById(string id)
    {
        int idAsInt = int.Parse(id);
        Address? address = await _globalService.AddressService.Get(idAsInt);
        
        if (address == null)
            return NotFound();
        
        return Ok(address);
    }
    
        
    [HttpPut ("{id}")]
    public async Task<IActionResult> UpdateTrip(string id, [FromBody] Trip updatedTrip)
    {
        int idAsInt = int.Parse(id);
        if (updatedTrip?.ID != idAsInt)  return BadRequest();

        Trip? existingTrip = await _globalService.TripService.Get(idAsInt);
        if (existingTrip == null) return NotFound();

        // TODO also update FKs of addresses and vehicle...
        existingTrip.Title = updatedTrip.Title;
        existingTrip.StartTime = updatedTrip.StartTime;
        existingTrip.EndTime = updatedTrip.EndTime;
        existingTrip.Duration = updatedTrip.Duration;
        existingTrip.AvailableSeats = updatedTrip.AvailableSeats;
        existingTrip.Price = updatedTrip.Price;
        existingTrip.PaymentMethod = updatedTrip.PaymentMethod;
        existingTrip.Status = existingTrip.Status;

        await _globalService.TripService.Update(existingTrip);

        return NoContent();
    }
}