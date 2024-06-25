using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.JavaScript;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Identity.Client;
using System.Globalization;

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


    [HttpGet("trips")]
    public async Task<IActionResult> GetTrips()
    {
        List<Trip?> trips = await _globalService.TripService.Get();
        return Ok(trips);
    }

    [HttpGet("trips/extended")]
    public async Task<IActionResult> GetTripsExtended()
    {
        List<Trip?> trips = await _globalService.TripService.Get();
        List<Address?> addresses = await _globalService.AddressService.Get();

        List<ExtendedTrip> extendedTrips = new List<ExtendedTrip>();
        
        foreach (var trip in trips)
        {
            User? user = await _globalService.UserService.Get(trip.FK_Driver);
            Address? start = addresses.Where(r => r != null && r.ID == trip.FK_StartAddress).First();
            Address? end = addresses.Where(r => r != null && r.ID == trip.FK_EndAddress).First();
            
            // Calculate the duration
            TimeSpan difference = trip.EndTime - trip.StartTime;
            double differenceInMinutes = Math.Round(difference.TotalMinutes, 0);

            if (differenceInMinutes == 1440)
            {
                differenceInMinutes = 0;
            }
            
            // Rating
            List<Rating?> userRatings  = await _globalService.RatingService.Get();
        
            if (userRatings.Count == 0)
            {
                return NotFound();
            }; 
        
            List<Rating> FilterdUserRatings = userRatings.Where(r => r != null && r.FK_RatedUser == user.Id).ToList();
            float sumRating = 0;
            
            foreach (Rating rating in FilterdUserRatings)
            {
                sumRating += rating.Score;
            }
            
            ExtendedTrip newTrip = new ExtendedTrip()
            {
                tripId = trip.ID,
                startPoint = start,
                startTime = trip.StartTime,
                endPoint = end,
                endTime = trip.EndTime,
                duration = differenceInMinutes,
                driver = user,
                seatsAvailable = trip.AvailableSeats,
                price = trip.Price,
                additionalStops = Array.Empty<ExtendedTrip>(),
                rating = sumRating,
                ratingCount = FilterdUserRatings.Count(),
            };
            
            extendedTrips.Add(newTrip);
        }

        return Ok(extendedTrips);
    }

    [HttpGet("address/{id}")]
    public async Task<ActionResult<Address>> GetAddressByAsync(string id)
    {
        var entrys = await _globalService.AddressService.Get();
        if (entrys == null)
        {
            return NotFound();
        }

        var entry = entrys.Where(r => r != null && r.ID.ToString() == id).First();
        return Ok(entry);
    }

    [HttpGet("driver/{loggedInUserId}")]
    public async Task<IActionResult> GetDriverTrips(string loggedInUserId)
    {
        List<Trip?> trips = await _globalService.TripService.Get();
        trips = trips.Where(trip => trip != null && trip.FK_Driver == loggedInUserId && trip.Status == "Open").ToList();
        return Ok(trips);
    }

    [HttpGet("requestUsers/{tripId}")]
    public async Task<IActionResult> GetRequestUsersByTripId(string tripId)
    {
        List<User?> requestUsers = new();
        List<TripRequest?> tripRequests = await _globalService.TripRequestService.Get();
        if (!tripRequests.Any()) return Ok(requestUsers);
        
        int tripIdAsInt = int.Parse(tripId);
        tripRequests = tripRequests.Where(tr => tr != null && tr.FK_Trip == tripIdAsInt).ToList();
        if (!tripRequests.Any()) return Ok(requestUsers);

        foreach (TripRequest request in tripRequests)
        {
            User? user = await _globalService.UserService.Get(request.FK_PotentialPassenger);
            requestUsers.Add(user);
        }

        return Ok(requestUsers);
    }
    
    [HttpGet("passengers/{tripId}")]
    public async Task<IActionResult> GetPassengersByTripId(string tripId)
    {
        List<TripPassenger?> passengers = await _globalService.TripPassengerService.Get();
        if (!passengers.Any()) return Ok(passengers);
        
        int tripIdAsInt = int.Parse(tripId);
        passengers = passengers.Where(p => p != null && p.FK_Trip == tripIdAsInt).ToList();

        return Ok(passengers);
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
            newStop.Time = trip.StartTime.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
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
        newStop.Time = trip.StartTime.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
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
        newStop.Time = trip.StartTime.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
        newStop.FreeSeats = trip.AvailableSeats.ToString();
        
        return Ok(newStop);
    }

    [HttpPost("Create")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateTrip([Required][FromBody] Trip trip)
        => await _globalService.TripService.Create(trip);
}


class TotalRating
{
    public float Rating { get; set; }

}

class ExtendedTrip
{
    public int tripId { get; set; }
    public Address startPoint { get; set; }
    public DateTime startTime { get; set; }
    public Address endPoint { get; set; }
    public DateTime endTime { get; set; }
    public double duration { get; set; }
    public User driver { get; set; }
    public float seatsAvailable { get; set; }
    public float price { get; set; }
    public ExtendedTrip[] additionalStops { get; set; }
    public float rating { get; set; }
    public int ratingCount { get; set; }
}



class Stop()
{
    public string Location { get; set; }
    public string Time { get; set; }
    public string FreeSeats { get; set; }
}