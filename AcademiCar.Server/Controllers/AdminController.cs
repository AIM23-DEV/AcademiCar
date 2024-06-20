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
        List<User?> users = await _globalService.UserService.Get();
        return Ok(users);
    }

    [HttpGet("users/{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
        User? user = await _globalService.UserService.Get(id);
        if (user == null) return NotFound();

        return Ok(user);
    }

    [HttpGet("users/address/{id}")]
    public async Task<IActionResult> GetUserAddress(string id)
    {
        User? user = await _globalService.UserService.Get(id);
        if (user == null) return NotFound();
        
        Address? userAddress  = await _globalService.AddressService.Get(user.FK_Address);
        if (userAddress == null) return NotFound();

        return Ok(userAddress);
    }
    
    [HttpGet("users/stats/{id}")]
    public async Task<IActionResult> GetUserStats(string id)
    {
        int idAsInt = int.Parse(id);
        Stats? userStats = await _globalService.StatsService.Get(idAsInt);
        return Ok(userStats);
    }
    
    [HttpGet("users/rating/{id}")]
    public async Task<IActionResult> GetUserRatingData(string id)
    {
        List<Rating?> userRatings = await _globalService.RatingService.Get();
        if (userRatings.Count == 0) return NotFound();
        
        userRatings = [..userRatings.Where(r => r != null && r.FK_RatedUser == id)];
        float scoreSum = userRatings.Sum(rating => rating.Score);
        
        RatingData ratingData = new(); 
        ratingData.TotalScore = scoreSum / userRatings.Count;
        ratingData.RatingCount = userRatings.Count;
        
        return Ok(ratingData);
    }
}

class RatingData
{
    public float TotalScore { get; set; }
    public int RatingCount { get; set; }
}