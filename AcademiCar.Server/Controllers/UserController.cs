using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AcademiCar.Server.Controllers
{
    public class UserController : BaseController<User>
    {
        private IGlobalService _globalService;

        public UserController(IGlobalService globals, IHttpContextAccessor accessor)
            : base(globals.UserService, accessor)
        {
            _globalService = globals;
        }


        [HttpPost("Register")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
        public async Task<ActionResult<ActionResultResponseModel>> Register([Required][FromBody] User user)
            => await _globalService.UserService.Create(user);
    }
}
