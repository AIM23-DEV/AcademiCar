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


    [HttpPost("Create")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateTrip([Required][FromBody] Trip trip)
        => await _globalService.TripService.Create(trip);
}