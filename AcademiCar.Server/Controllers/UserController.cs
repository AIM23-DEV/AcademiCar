using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using AcademiCar.Server.Services.Response;

namespace AcademiCar.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IGlobalService _globalService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly PostgresDbContext _context;

        /*
        protected readonly Service<T> _service;
        protected readonly ClaimsPrincipal _claimsPrincipal;
        protected readonly string _userEmail;
        */

        public UserController(IGlobalService globals, IHttpContextAccessor accessor, UserManager<User> userManager,
            SignInManager<User> signInManager, PostgresDbContext context)
        {
            _globalService = globals;
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;

            /*
            _claimsPrincipal = accessor.HttpContext?.User;

            Task modelState = _service.SetModelState(ModelState);
            modelState.Wait();

            IEnumerable<Claim> claims = _claimsPrincipal?.Claims;
            Claim? emailClaim = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            if (emailClaim != null)
            {
                _userEmail = emailClaim.Value;

                //TODO - Load user for authentication purposes?
                //Task user = _service.Load(_userEmail);
                //user.Wait();
            }
            */
        }

        [HttpGet("{id}", Name = "GetUserbyId")]
        public async Task<ActionResult<User>> GetUserByIdAsync(string id)
        {
            var entry = await _context.Users.FindAsync(id);
            if (entry == null)
            {
                return NotFound();
            }

            return entry;
        }

        [HttpGet]
        public async Task<ActionResult<User>> GetUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User is not logged in.");
            }

            var roles = await _userManager.GetRolesAsync(user);

            return user;
        }
        
        [HttpGet("logout", Name = "Logout")]
        public async Task<ActionResult<ActionResultResponseModel>> Logout()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized("User is not logged in.");
            }

            await _signInManager.SignOutAsync();

            return Ok(new ActionResultResponseModel { IsSuccess = true, Message = "User logged out successfully." });
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ActionResultResponseModel>> Register([Required] [FromBody] RegisterModel model)
        {
            var user = new User
            {
                UserName = model.Username,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                FK_Stats = model.FK_Stats,
                FK_Address = model.FK_Address
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new ActionResultResponseModel { IsSuccess = true, Message = "User registered successfully" });
            }

            return BadRequest(new ActionResultResponseModel
                { IsSuccess = false, Message = string.Join(", ", result.Errors.Select(e => e.Description)) });
        }

        [HttpPost("SamlLogin")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<ActionResultResponseModel>> SamlLogin([Required] [FromBody] SamlLoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                user = new User
                {
                    UserName = model.Username,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    // Add any additional properties specific to SAML users
                };

                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest(new ActionResultResponseModel
                        { IsSuccess = false, Message = string.Join(", ", result.Errors.Select(e => e.Description)) });
                }
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(new ActionResultResponseModel { IsSuccess = true, Message = "SAML user logged in successfully" });
        }

        [HttpPost("AdminLogin")]
        [AllowAnonymous]
        public async Task<IActionResult> AdminLogin([Required] AdminLoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password,
                    isPersistent: false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    return Ok(new
                    {
                        UserName = user.UserName,
                        FirstName = user.FirstName,
                        UserID = user.Id,
                        Roles = roles.ToArray(),
                        Success = true,
                        Message = "Admin logged in successfully"
                    });
                }
            }

            return Unauthorized(new { Success = false, Message = "Invalid username or password" });
        }


        public class RegisterModel
        {
            [Required] [EmailAddress] public string Email { get; set; }
            [Required] public string Username { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Required] public string FirstName { get; set; }
            [Required] public string LastName { get; set; }
            [Required] public int FK_Stats { get; set; }
            [Required] public int FK_Address { get; set; }
        }

        public class SamlLoginModel
        {
            [Required] [EmailAddress] public string Email { get; set; }

            [Required] public string Username { get; set; }

            [Required] public string FirstName { get; set; }

            [Required] public string LastName { get; set; }

            [Required] public string SAML2Id { get; set; }
        }

        public class AdminLoginModel
        {
            [Required] public string UserName { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }
        }
    }
}