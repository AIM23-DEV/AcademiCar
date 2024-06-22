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
    
        
    // FaceSheet Page
    [HttpGet("prefs/{id}")]
    public async Task<IActionResult> GetPrefs(string id)
    {
        List<Preferences> userPreferences = await _globalService.PreferencesService.GetByUserId(id);
        if (userPreferences.Count == 0) return BadRequest();

        List<MusicPreference> allMusicPreferences = [];
        List<InterestPreference> allInterestPreferences = [];
        List<TravelPreference> allTravelPreferences = [];
        foreach (Preferences p in userPreferences)
        {
            List<MusicPreference> mPrefs = await _globalService.MusicPreferenceService.GetByPreferenceId(p.ID);
            List<InterestPreference> iPrefs = await _globalService.InterestPreferenceService.GetByPreferenceId(p.ID);
            List<TravelPreference> tPrefs = await _globalService.TravelPreferenceService.GetByPreferenceId(p.ID);
            
            allMusicPreferences.AddRange(mPrefs);
            allInterestPreferences.AddRange(iPrefs);
            allTravelPreferences.AddRange(tPrefs);
        }

        string musicPrefs = allMusicPreferences.Aggregate("", (s, mPref) => s + $"{mPref.Genre},")[..^1];
        string interests = allInterestPreferences.Aggregate("", (s, iPref) => s + $"{iPref.Interest},")[..^1];
        string travelPrefs = allTravelPreferences.Aggregate("", (s, tPref) => s + $"{tPref.PreferenceText},")[..^1];

        PrefsData loadedPrefsData = new();
        loadedPrefsData.MusicPrefs = musicPrefs;
        loadedPrefsData.Interests = interests;
        loadedPrefsData.TravelPrefs = travelPrefs;
        
        return Ok(loadedPrefsData);
    }
    
    [HttpPost("prefs/update/{id}")]
    public async Task<IActionResult> UpdatePrefs(string id, [FromBody] PrefsData prefsData)
    {
        try
        {
            List<Preferences> userPreferences = await _globalService.PreferencesService.GetByUserId(id);
            if (userPreferences.Count == 0) return NotFound();

            List<MusicPreference> allMusicPreferences = [];
            List<InterestPreference> allInterestPreferences = [];
            List<TravelPreference> allTravelPreferences = [];
            foreach (Preferences p in userPreferences)
            {
                List<MusicPreference> mPrefs = await _globalService.MusicPreferenceService.GetByPreferenceId(p.ID);
                List<InterestPreference> iPrefs = await _globalService.InterestPreferenceService.GetByPreferenceId(p.ID);
                List<TravelPreference> tPrefs = await _globalService.TravelPreferenceService.GetByPreferenceId(p.ID);
            
                allMusicPreferences.AddRange(mPrefs);
                allInterestPreferences.AddRange(iPrefs);
                allTravelPreferences.AddRange(tPrefs);
            }

            foreach (MusicPreference musicPreference in allMusicPreferences)
            {
                await _globalService.MusicPreferenceService.Delete(musicPreference.ID);
            }
            foreach (InterestPreference interestPreference in allInterestPreferences)
            {
                await _globalService.InterestPreferenceService.Delete(interestPreference.ID);
            }
            foreach (TravelPreference travelPreference in allTravelPreferences)
            {
                await _globalService.TravelPreferenceService.Delete(travelPreference.ID);
            }

            string[] musicGenres = prefsData.MusicPrefs.Split(',');
            foreach (string musicGenre in musicGenres)
            {
                MusicPreference newMusicPref = new();
                newMusicPref.FK_Preferences = userPreferences[0].ID;
                newMusicPref.Genre = musicGenre;

                await _globalService.MusicPreferenceService.Create(newMusicPref);
            }
        
            string[] interests = prefsData.Interests.Split(',');
            foreach (string interest in interests)
            {
                InterestPreference newInterestPref = new();
                newInterestPref.FK_Preferences = userPreferences[0].ID;
                newInterestPref.Interest = interest;

                await _globalService.InterestPreferenceService.Create(newInterestPref);
            }
            
            string[] travelPrefs = prefsData.TravelPrefs.Split(',');
            foreach (string travelPref in travelPrefs)
            {
                TravelPreference newTravelPref = new();
                newTravelPref.FK_Preferences = userPreferences[0].ID;
                newTravelPref.PreferenceText = travelPref;
                newTravelPref.IconType = "Talk";

                await _globalService.TravelPreferenceService.Create(newTravelPref);
            }
            
            return Ok();
        }
        catch (Exception e)
        {
            Console.Write(e);
            return BadRequest();
        }
    }
}

public class RatingData
{
    public float TotalScore { get; set; }
    public int RatingCount { get; set; }
}

public class PrefsData
{
    public string MusicPrefs { get; set; }
    public string Interests { get; set; }
    public string TravelPrefs { get; set; }
}