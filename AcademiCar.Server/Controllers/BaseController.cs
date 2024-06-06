using AcademiCar.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController<T> : ControllerBase where T : class, IEntity
    {
        protected readonly Service<T> _service;
        protected readonly ClaimsPrincipal _claimsPrincipal;
        protected readonly string _userEmail;

        public BaseController(Service<T> service, IHttpContextAccessor accessor)
        {
            _service = service;
            _claimsPrincipal = accessor.HttpContext.User;

            Task modelState = _service.SetModelState(ModelState);
            modelState.Wait();

            var claims = _claimsPrincipal.Claims;
            var emailClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            if (emailClaim != null)
            {
                _userEmail = emailClaim.Value;

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

        /*[HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<T> Get(int id) => await _service.Get(id);*/

        #endregion
    }
}
