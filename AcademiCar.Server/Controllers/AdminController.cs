using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly IGlobalService _globalService;
    
    public AdminController(IGlobalService globals)
    {
        _globalService = globals;
    }
    
    
    [HttpGet("users")]
    public async Task<ActionResult<List<User?>>> GetCarlos()
    {
        List<User?> users  = await _globalService.UserService.Get();
        return Ok(users);
    }
}