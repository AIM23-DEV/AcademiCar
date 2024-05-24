using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Sustainsys.Saml2.AspNetCore2;
using System.Security.Claims;

namespace AcademiCar.Server.Controllers;

[Route("Saml2")]
public class Saml2Controller : Controller
{
    [HttpPost("Acs")]
    public async Task<IActionResult> Acs()
    {
        var result = await HttpContext.AuthenticateAsync("Saml2");
        if (!result.Succeeded)
        {
            return Unauthorized();
        }

        var claimsIdentity = new ClaimsIdentity(result.Principal.Claims, "Saml2");
        await HttpContext.SignInAsync(new ClaimsPrincipal(claimsIdentity));
        return Redirect("/");
    }

    [HttpGet("Login")]
    public IActionResult Login([FromQuery] string idp)
    {
        if (string.IsNullOrEmpty(idp))
        {
            return BadRequest("IdP parameter is required.");
        }

        var properties = new AuthenticationProperties
        {
            RedirectUri = "/"
        };
        properties.Items["idp"] = idp;

        return Challenge(properties, Saml2Defaults.Scheme);
    }

    [HttpGet("Logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Redirect("/");
    }
}