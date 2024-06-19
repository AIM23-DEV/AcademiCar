using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public async Task<IActionResult> GetUsers()
    {
        List<User?> users = await _globalService.UserService.Get();
        return Ok(users);
    }

    [HttpGet("users/{id}")]
    public async Task<ActionResult<User>> GetUserByIdAsync(string id)
    {
        var entry = await _globalService.UserService.Get(id);
        if (entry == null)
        {
            return NotFound();
        }

        return entry;
    }

    [HttpGet("users/stats/{id}")]
    public async Task<IActionResult> GetUserStats(string id)
    {
        int idAsInt = int.Parse(id);
        Stats? userStats  = await _globalService.StatsService.Get(idAsInt);
        return Ok(userStats);
    }
}