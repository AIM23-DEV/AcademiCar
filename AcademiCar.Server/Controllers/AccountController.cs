using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Sustainsys.Saml2.AspNetCore2;

namespace AcademiCar.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        // Initiates the SAML authentication challenge
        [HttpGet("login")]
        public IActionResult Login()
        {
            // RedirectUri is the URL to redirect to after login, typically the homepage or dashboard
            return Challenge(new AuthenticationProperties { RedirectUri = "http://localhost:3000" }, Saml2Defaults.Scheme);
        }

        // Handles the logout process
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Sign out the user from the application
            await HttpContext.SignOutAsync();
            return Redirect("http://localhost:3000");
        }

        // Returns information about the authenticated user
        [HttpGet("user")]
        public IActionResult GetUser()
        {
            if (User.Identity.IsAuthenticated)
            {
                return Ok(new
                {
                    User.Identity.Name,
                    Claims = User.Claims.Select(c => new { c.Type, c.Value })
                });
            }
            return Unauthorized();
        }

        // Endpoint to handle SAML2 responses
        [HttpPost("AssertionConsumerService")]
        public async Task<IActionResult> AssertionConsumerService()
        {
            // Process the SAML2 response here
            var result = await HttpContext.AuthenticateAsync(Saml2Defaults.Scheme);
            if (result.Succeeded)
            {
                // Authentication was successful
                // Redirect to the appropriate page
                return Redirect("http://localhost:3000");
            }

            // Authentication failed
            return Unauthorized();
        }
    }
}