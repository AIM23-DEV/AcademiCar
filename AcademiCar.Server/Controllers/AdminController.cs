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
    
    //GET all users
    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        List<User?> users  = await _globalService.UserService.Get();
        return Ok(users);
    }
    
    //GET one user
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
    
    //Get user adress
    [HttpGet ("address/{id}")]
    public async Task<IActionResult> GetAddressById(string id)
    {
        int idAsInt = int.Parse(id);
        Address? address = await _globalService.AddressService.Get(idAsInt);
        
        if (address == null)
            return NotFound();
        
        return Ok(address);
    }
    
    
    //PUT DELETE user
    [HttpDelete ("users/deleteUser/{id}")]
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
    
    //PUT BLOCK user
    [HttpPut ("users/blockUser/{id}")]
    public async Task<IActionResult> BlockUser(string id)
    {
        User? user  = await _globalService.UserService.Get(id);
        if (user == null)
        {
            return BadRequest();
        }
        user.PasswordHash = "BLOCKED";
        await _globalService.UserService.Update(user);
        return Ok();
    }
    
    //GET RATING (Stars)
    [HttpGet("users/rating/{id}")]
    public async Task<IActionResult> GetUserRating(string id)
    {
        List<Rating?> userRatings  = await _globalService.RatingService.Get();
        
        if (userRatings.Count == 0)
        {
            return NotFound();
        }; 
        
        List<Rating> FilterdUserRatings = userRatings.Where(r => r != null && r.FK_RatedUser == id).ToList();

        float sumRating = 0;

        foreach (Rating rating in FilterdUserRatings)
        {
            sumRating += rating.Score;
        }
        TotalRating totalRating = new (); 
            
        totalRating.Rating  = sumRating / FilterdUserRatings.Count();
        
        return Ok(totalRating);
    }
    
    //GET REVIEWS 
    [HttpGet("users/review/{id}")]
    public async Task<ActionResult<User>> GetUserReviews(string id)
    {
        
        List<Rating?> userRatings  = await _globalService.RatingService.Get();
        
        if (userRatings.Count == 0)
        {
            return NotFound();
        }; 
        
        List<Rating> FilterdUserRatings = userRatings.Where(r => r != null && r.FK_RatedUser == id).ToList();
        
        return Ok(FilterdUserRatings.Count());
        
    }
    
    
    
}

class TotalRating
{
    public float Rating { get; set; }

}