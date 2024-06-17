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
    public async Task<IActionResult> GetUsers()
    {
        List<User?> users  = await _globalService.UserService.Get();
        return Ok(users);
    }
    
    [HttpPut ("users/delete/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        User? user  = await _globalService.UserService.Get(id);
        if (user == null)
        {
            return NotFound();
        }
        await _globalService.UserService.Delete(id);
        return Ok();
    }
    
    
    [HttpPut ("users/block/{id}")]
    public async Task<IActionResult> BlockUser(string id)
    {
        User? user  = await _globalService.UserService.Get(id);
        if (user == null)
        {
            return NotFound();
        }
        user.PasswordHash = "";
        await _globalService.UserService.Update(user);
        return Ok();
    }
    
    [HttpGet("users/stats/{id}")]
    public async Task<IActionResult> GetUserStats(string id)
    {
        int idAsInt = int.Parse(id);
        Stats? userStats  = await _globalService.StatsService.Get(idAsInt);
        return Ok(userStats);
    }
    
    
}