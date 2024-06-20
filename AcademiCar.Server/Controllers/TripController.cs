using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.Services.Response;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/trip")]
public class TripController : ControllerBase
{
    private readonly IGlobalService _globalService;

    public TripController(IGlobalService globals)
    {
        _globalService = globals;
    }

    [HttpGet("driver/{loggedInUserId}")]
    public async Task<IActionResult> GetDriverTrips(string loggedInUserId)
    {
        List<Trip?> trips = await _globalService.TripService.Get();
        trips = trips.Where(trip => trip != null && trip.FK_Driver == loggedInUserId && trip.Status == "Open").ToList();
        return Ok(trips);
    }
    
    [HttpGet("passenger/{loggedInUserId}")]
    public async Task<IActionResult> GetPassengerTrips(string loggedInUserId)
    {
        List<Trip?> trips = await _globalService.TripService.Get();
        List<TripPassenger?> passengers = await _globalService.TripPassengerService.Get();
        passengers = passengers.Where(x => x != null && x.FK_PassengerUser == loggedInUserId).ToList();
        trips = trips.Where(trip => trip != null && passengers.Any(x => x.FK_Trip == trip.ID)).ToList();
        return Ok(trips);
    }
    
    [HttpGet("tripCard/driver/{driverId}")]
    public async Task<IActionResult> GetDriverUser(string driverId)
    {
        User? user = await _globalService.UserService.Get(driverId);
        return Ok(user);
    }
    
    [HttpGet("tripCard/stops/{tripId}")]
    public async Task<IActionResult> GetStops(string tripId)
    {
        int tripIdAsInt = int.Parse(tripId);
        Trip? trip = await _globalService.TripService.Get(tripIdAsInt);
        Address? startAddress = await _globalService.AddressService.Get(trip.FK_StartAddress);
        Address? endAddress = await _globalService.AddressService.Get(trip.FK_EndAddress);

        List<TripStop?> tripStops = await _globalService.TripStopService.Get();
        tripStops = tripStops.Where(x => x != null && x.FK_Trip == tripIdAsInt).ToList();
        List<Address?> stopAddresses = await _globalService.AddressService.Get();
        stopAddresses = stopAddresses.Where(address => address != null && tripStops.Any(x => x.FK_StopAddress == address.ID))
            .ToList();

        List<Address> allAddresses = new();
        allAddresses.Add(startAddress);
        allAddresses.Add(endAddress);
        allAddresses.AddRange(stopAddresses);

        List<Stop> stops = new();
        
        foreach (Address address in allAddresses)
        {
            Stop newStop = new();
            newStop.Location = address.Street;
            newStop.Time = trip.StartTime.ToString();
            newStop.FreeSeats = trip.AvailableSeats.ToString();
        }
        return Ok(stops);
    }
    
    [HttpGet("tripCard/start/{tripId}")]
    public async Task<IActionResult> GetStartAddress(string tripId)
    {
        int tripIdAsInt = int.Parse(tripId);
        Trip? trip = await _globalService.TripService.Get(tripIdAsInt);
        Address? startAddress = await _globalService.AddressService.Get(trip.FK_StartAddress);

        Stop newStop = new();
        newStop.Location = startAddress.Street;
        newStop.Time = trip.StartTime.ToString();
        newStop.FreeSeats = trip.AvailableSeats.ToString();
        
        return Ok(newStop);
    }
    
    [HttpGet("tripCard/end/{tripId}")]
    public async Task<IActionResult> GetEndAddress(string tripId)
    {
        int tripIdAsInt = int.Parse(tripId);
        Trip? trip = await _globalService.TripService.Get(tripIdAsInt);
        Address? endAddress = await _globalService.AddressService.Get(trip.FK_EndAddress);

        Stop newStop = new();
        newStop.Location = endAddress.Street;
        newStop.Time = trip.StartTime.ToString();
        newStop.FreeSeats = trip.AvailableSeats.ToString();
        
        return Ok(newStop);
    }

    [HttpPost("Create")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateTrip([Required][FromBody] Trip trip)
        => await _globalService.TripService.Create(trip);
}

class Stop()
{
    public string Location { get; set; }
    public string Time { get; set; }
    public string FreeSeats { get; set; }
}