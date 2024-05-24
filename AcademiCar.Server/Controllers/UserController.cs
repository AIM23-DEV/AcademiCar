using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AcademiCar.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController<User>
    {
        private readonly IGlobalService _globalService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserController(IGlobalService globals, IHttpContextAccessor accessor, UserManager<User> userManager, SignInManager<User> signInManager)
            : base(globals.UserService, accessor)
        {
            _globalService = globals;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ActionResultResponseModel>> Register([Required][FromBody] RegisterModel model)
        {
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new ActionResultResponseModel { Success = true, Message = "User registered successfully" });
            }

            return BadRequest(new ActionResultResponseModel { Success = false, Message = string.Join(", ", result.Errors.Select(e => e.Description)) });
        }

        [HttpPost("SamlLogin")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ActionResultResponseModel>> SamlLogin([Required][FromBody] SamlLoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                user = new User
                {
                    UserName = model.Email,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    // Add any additional properties specific to SAML users
                };

                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest(new ActionResultResponseModel { Success = false, Message = string.Join(", ", result.Errors.Select(e => e.Description)) });
                }
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(new ActionResultResponseModel { Success = true, Message = "SAML user logged in successfully" });
        }
    }

    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
    }

    public class SamlLoginModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string SAML2Id { get; set; }
    }

    public class ActionResultResponseModel
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
