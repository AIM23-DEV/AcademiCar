using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AcademiCar.Server.Controllers
{
    public class TripController : BaseController<Trip>
    {
        private IGlobalService _globalService;

        public TripController(IGlobalService globals, IHttpContextAccessor accessor)
            : base(globals.TripService, accessor)
        {
            _globalService = globals;
        }


        [HttpPost("Create")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
        public async Task<ActionResult<ActionResultResponseModel>> CreateTrip([Required][FromBody] Trip trip)
            => await _globalService.TripService.Create(trip);
    }
}
