﻿using AcademiCar.Server.DAL.Entities;
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


