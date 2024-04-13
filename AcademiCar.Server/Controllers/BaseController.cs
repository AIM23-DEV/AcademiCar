using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AcademiCar.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController<T> : ControllerBase where T : Entity
    {
        protected Service<T> _service = null;
        protected ClaimsPrincipal _claimsPrincipal = null;
        protected string _userEmail = null;


        public BaseController(Service<T> service, IHttpContextAccessor accessor)
        {
            _service = service;
            _claimsPrincipal = accessor.HttpContext.User;

            Task modelState = _service.SetModelState(ModelState);
            modelState.Wait();


            var identity = (ClaimsPrincipal)accessor.HttpContext.User.Identity;
            
            IEnumerable<Claim> claims = identity.Claims;

            var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            if (email != null)
            {
                _userEmail = email.Value;

                /* TODO - Load user for authentication purposes?
                Task user = _service.Load(_userEmail);
                user.Wait();
                */
            }
        }


        #region Endpoints

        [HttpGet("All")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<List<T>> GetAll() => await _service.Get();

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<T> Get(int id) => await _service.Get(id);

        #endregion
    }
}
