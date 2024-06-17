using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Sustainsys.Saml2.AspNetCore2;
using Microsoft.Extensions.Logging;

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
            _logger.LogInformation("Login endpoint hit.");

            var properties = new AuthenticationProperties
            {
                RedirectUri = "/"
            };

            properties.Items["idp"] = "https://idp.fh-joanneum.at/idp/shibboleth";

            _logger.LogInformation("Initiating challenge to SAML2 IdP: {IdP}", properties.Items["idp"]);

            return Challenge(properties, Saml2Defaults.Scheme);
        }

        [HttpGet("Logout")]
        public async Task<IActionResult> Logout()
        {
            _logger.LogInformation("Logout endpoint hit.");
            await HttpContext.SignOutAsync();
            return Redirect("/");
        }
    }
}