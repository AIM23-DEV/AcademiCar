using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AcademiCar.Server.Controllers;

public class VehicleController : BaseController<Vehicle>
{
    private IGlobalService _globalService;

    public VehicleController(IGlobalService globals, IHttpContextAccessor accessor)
        : base(globals.VehicleService, accessor)
    {
        _globalService = globals;
    }


    [HttpPost("Add")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> AddVehicle([Required][FromBody] Vehicle vehicle)
        => await _globalService.VehicleService.Create(vehicle);
}
