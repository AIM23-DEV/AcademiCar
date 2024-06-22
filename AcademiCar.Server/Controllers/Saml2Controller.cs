using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Sustainsys.Saml2.AspNetCore2;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;
using Sustainsys.Saml2.Saml2P;

namespace AcademiCar.Server.Controllers
{
    [ApiController]
    [Route("Saml2")]
    public class Saml2Controller : ControllerBase
    {
        private readonly ILogger<Saml2Controller> _logger;

        public Saml2Controller(ILogger<Saml2Controller> logger)
        {
            _logger = logger;
        }

        [HttpPost("Acs")]
        public async Task<IActionResult> Acs()
        {
            _logger.LogWarning("Acs endpoint hit. Yessssss!");
            
            var result = await HttpContext.AuthenticateAsync(Saml2Defaults.Scheme);
            if (!result.Succeeded)
            {
                _logger.LogWarning("result not succeeded");
                return Unauthorized();
            }
            
            var claimsIdentity = new ClaimsIdentity(result.Principal.Claims, "Saml2");
            await HttpContext.SignInAsync(new ClaimsPrincipal(claimsIdentity));
            _logger.LogWarning("result succeeded");
            return Redirect("/");
        }

        [HttpGet("Login")]
        public IActionResult Login()
        {
            _logger.LogInformation("Initiating SAML login.");
            return Challenge(new AuthenticationProperties { RedirectUri = "https://academicar.net" }, Saml2Defaults.Scheme);
        }
        /*
        [HttpGet("Login")]
        public IActionResult Login()
        {
            _logger.LogInformation("Login endpoint hit.");

            var properties = new AuthenticationProperties
            {
                RedirectUri = "/"
            };

            properties.Items["idp"] = "https://idp.fh-joanneum.at/idp/shibboleth";

            _logger.LogInformation("Initiating challenge to SAML2 IdP: {IdP}", properties.Items["idp"]);

            return Challenge(properties, Saml2Defaults.Scheme);
        }
        */
        // Handles the logout process
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            _logger.LogInformation("Logout endpoint hit.");
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