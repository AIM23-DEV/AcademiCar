using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Sustainsys.Saml2.AspNetCore2;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;

namespace AcademiCar.Server.Controllers
{
    [Route("Saml2")]
    [ApiController]
    public class Saml2Controller : ControllerBase
    {
        private readonly ILogger<Saml2Controller> _logger;

        public Saml2Controller(ILogger<Saml2Controller> logger)
        {
            _logger = logger;
        }

        // Initiates the SAML authentication challenge
        [HttpGet("login")]
        public IActionResult Login()
        {
            _logger.LogInformation("Initiating SAML login.");
            return Challenge(new AuthenticationProperties { RedirectUri = "https://academicar.net" }, Saml2Defaults.Scheme);
        }

        // Handles the logout process
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            _logger.LogInformation("User logging out.");
            await HttpContext.SignOutAsync();
            return Redirect("https://academicar.net");
        }

        // Returns information about the authenticated user
        [HttpGet("user")]
        public IActionResult GetUser()
        {
            if (User.Identity.IsAuthenticated)
            {
                _logger.LogInformation("User is authenticated.");
                return Ok(new
                {
                    User.Identity.Name,
                    Claims = User.Claims.Select(c => new { c.Type, c.Value })
                });
            }
            _logger.LogWarning("User is not authenticated.");
            return Unauthorized();
        }

        // Endpoint to handle SAML2 responses
        [HttpPost("AssertionConsumerService")]
        public async Task<IActionResult> AssertionConsumerService()
        {
            _logger.LogInformation("Processing SAML2 response.");
            try
            {
                var result = await HttpContext.AuthenticateAsync(Saml2Defaults.Scheme);
                if (result.Succeeded)
                {
                    _logger.LogInformation("SAML2 authentication succeeded.");
                    return Redirect("https://academicar.net");
                }
                _logger.LogWarning("SAML2 authentication failed.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during SAML2 authentication.");
            }

            return Unauthorized();
        }
    }
}
