using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/chat")]
public class ChatController : ControllerBase
{
    private IGlobalService _globalService;
    private readonly Random _random;
    
    public ChatController(IGlobalService globals)
    {
        _globalService = globals;
        _random = new Random();
    }

    
    #region Helper Functions

    private async Task<int> _GetNewPersonalChatID()
    {
        int newId = _random.Next(1, 999999999);
        PersonalChat? pc = await _globalService.PersonalChatService.Get(newId);
        if (pc == null) return newId;
        
        return await _GetNewPersonalChatID();
    }
    
    #endregion

    
    [HttpPost("CreatePersonalMessage")]
    public async Task<IActionResult> CreatePersonalMessage([FromBody] PersonalMessage personalMessage)
    {
        await _globalService.PersonalMessageService.Create(personalMessage);
        return Ok();
    }
    
    [HttpGet("GetPersonalMessageById")]
    public async Task<IActionResult> GetPersonalMessageById(string id)
    {
        int idAsInt = int.Parse(id);
        PersonalMessage? personalMessage = await _globalService.PersonalMessageService.Get(idAsInt);
        
        if (personalMessage == null)
            return NotFound();
        
        return Ok(personalMessage);
    }
    
    [HttpGet("GetPersonalMessages")]
    public async Task<IActionResult> GetPersonalMessages()
    {
        List<PersonalMessage?> personalMessageList = await _globalService.PersonalMessageService.Get();
        
        if (!personalMessageList.Any())
            return NotFound();
        
        return Ok(personalMessageList);
    }

    [HttpPost("CreateGroupMessage")]
    public async Task<IActionResult> CreateGroupMessage([FromBody] GroupMessage groupMessage)
    {
        await _globalService.GroupMessageService.Create(groupMessage);
        return Ok();
    }
    
    [HttpGet("GetGroupMessageById")]
    public async Task<IActionResult> GetGroupMessageById(string id)
    {
        int idAsInt = int.Parse(id);
        GroupMessage? groupMessage = await _globalService.GroupMessageService.Get(idAsInt);
        
        if (groupMessage == null)
            return NotFound();
        
        return Ok(groupMessage);
    }
    
    [HttpGet("GetGroupMessages")]
    public async Task<IActionResult> GetGroupMessages()
    {
        List<GroupMessage?> groupMessageList = await _globalService.GroupMessageService.Get();
        
        if (!groupMessageList.Any())
            return NotFound();
        
        return Ok(groupMessageList);
    }
    
    [HttpGet("GetGroupChatById")]
    public async Task<IActionResult> GetGroupChatById(string id)
    {
        int idAsInt = int.Parse(id);
        GroupChat? groupChat = await _globalService.GroupChatService.Get(idAsInt);
        
        if (groupChat == null)
            return NotFound();
        
        return Ok(groupChat);
    }
    
    [HttpGet("GetGroupChats/{id}")]
    public async Task<IActionResult> GetGroupChats(string id)
    {
        List<GroupChat?> groupChatList = new List<GroupChat>();
        List<Trip> tripList = await _globalService.TripService.GetTripsByDriverId(id);
        
        foreach (Trip trip in tripList)
        {
            List<GroupChat> groupChatsForTrip = await _globalService.GroupChatService.GetGroupChatsByTripId(trip.ID);
            groupChatList.AddRange(groupChatsForTrip);
        }
        
        List<TripPassenger> passengerTripList = await _globalService.TripPassengerService.GetConnectionByPassengerID(id);
        foreach (TripPassenger tripPassenger in passengerTripList)
        {
            List<GroupChat> groupChatsForTrip = await _globalService.GroupChatService.GetGroupChatsByTripId(tripPassenger.FK_Trip);
            groupChatList.AddRange(groupChatsForTrip);
        }
        
        if (!groupChatList.Any())
            return NotFound();
        
        groupChatList.Sort((a, b) => a.UpdatedAt.CompareTo(b.UpdatedAt));
        foreach (GroupChat? groupChat in groupChatList)
        {
            if (groupChat == null) break;
            
            IEnumerable<GroupMessage> messages =
                _globalService.UnitOfWork.GroupMessages.FilterBy(message => message.FK_GroupChat == groupChat.ID);

            IEnumerable<GroupMessage> groupMessages = messages as GroupMessage[] ?? messages.ToArray();
            if (!groupMessages.Any()) break;
            
            groupChat.LastMessageContent = groupMessages.Last().Content ?? "";
        }
        
        return Ok(groupChatList);
    }

    [HttpPost("CreatePersonalChat")]
    public async Task<IActionResult> CreatePersonalChat([FromBody] PersonalChat personalChat)
    {
        await _globalService.PersonalChatService.Create(personalChat);
        return NoContent();
    }
    
    [HttpPost("CreateTripRequest")]
    public async Task<IActionResult> CreateTripRequest([FromBody] TripRequest tripRequest)
    {
        await _globalService.TripRequestService.Create(tripRequest);
        return NoContent();
    }
    
    [HttpGet("GetPersonalChatById")]
    public async Task<IActionResult> GetPersonalChatById(string id)
    {
        int idAsInt = int.Parse(id);
        PersonalChat? personalChat = await _globalService.PersonalChatService.Get(idAsInt);
        
        
        if (personalChat == null)
            return NotFound();
        
        personalChat.DriverUser = await _globalService.UserService.Get(personalChat.FK_DriverUser ?? "");
        personalChat.PassengerUser = await _globalService.UserService.Get(personalChat.FK_PassengerUser ?? "");
        
        return Ok(personalChat);
    }
    
    [HttpGet("GetPersonalChats/{id}")]
    public async Task<IActionResult> GetPersonalChats(string id)
    {
        List<PersonalChat> personalChatList = new List<PersonalChat>();
        List<PersonalChat> driverPersonalChatList = await _globalService.PersonalChatService.GetPersonalChatsByDriverId(id);
        List<PersonalChat> passengerPersonalChatList = await _globalService.PersonalChatService.GetPersonalChatsByPassengerId(id);
        
        personalChatList.AddRange(driverPersonalChatList);
        personalChatList.AddRange(passengerPersonalChatList);
        
        if (!personalChatList.Any())
            return Ok(personalChatList);

        personalChatList.Sort((a, b) => a.UpdatedAt.CompareTo(b.UpdatedAt));
        foreach (var personalChat in personalChatList)
        {
            if (personalChat == null) break;
            personalChat.DriverUser = await _globalService.UserService.Get(personalChat.FK_DriverUser ?? "");
            personalChat.PassengerUser = await _globalService.UserService.Get(personalChat.FK_PassengerUser ?? "");

            List<PersonalMessage> personalMessageList = _globalService.UnitOfWork.PersonalMessages.FilterBy(message => message.FK_PersonalChat == personalChat.ID).ToList();
            if(personalMessageList.Any())
                personalChat.LastMessageContent = personalMessageList.OrderBy(message => message.SentAt).Last()?.Content;
            else
                personalChat.LastMessageContent = "";
            
        }
        
        return Ok(personalChatList);
    }

    [HttpPost("CreateGroupChatUser")]
    public async Task<IActionResult> CreateGroupChatUser([FromBody] GroupChatUser groupChatUser)
    {
        await _globalService.GroupChatUserService.Create(groupChatUser);
        return NoContent();
    }
    
    [HttpGet("GetGroupChatUserById")]
    public async Task<IActionResult> GetGroupChatUserById(string id)
    {
        int idAsInt = int.Parse(id);
        GroupChatUser? groupChatUser = await _globalService.GroupChatUserService.Get(idAsInt);
        
        if (groupChatUser == null)
            return NotFound();
        
        return Ok(groupChatUser);
    }
    
    [HttpGet("GetGroupChatUsers")]
    public async Task<IActionResult> GetGroupChatUsers()
    {
        List<GroupChatUser?> groupChatUserList = await _globalService.GroupChatUserService.Get();
        
        if (!groupChatUserList.Any())
            return NotFound();
        
        return Ok(groupChatUserList);
    }
    
    [HttpGet("DeleteGroupChatUser")]
    public async void DeleteGroupChatUser(string id)
    {
        int idAsInt = int.Parse(id);
        await _globalService.GroupChatUserService.Delete(idAsInt);
    }
    
    [HttpGet("GetOpenRequestChatsForDriver/{id}")]
    public async Task<IActionResult> GetOpenRequestChatsForDriver(string id)
    {
        List<TripRequest> tripRequestList = new List<TripRequest>();
        List<PersonalChat> personalChatList = await _globalService.PersonalChatService.GetPersonalChatsByDriverId(id);
        List<Trip> tripList = await _globalService.TripService.GetTripsByDriverId(id);

        if (personalChatList.Count == 0 || tripList.Count == 0)
            return Ok(personalChatList);
        
        foreach(Trip trip in tripList)
        {
            List<TripRequest> currentTripRequests =
                await _globalService.TripRequestService.GetTripRequestsByTripId(trip.ID);
            tripRequestList.AddRange(currentTripRequests);
        }

        tripRequestList = tripRequestList.Where(t => t.Status.ToLower() == "open").ToList();

        List<PersonalChat> resultList = personalChatList
            .Where(c => tripRequestList.Any(r => r.FK_PotentialPassenger == c.FK_PassengerUser)).ToList();

        foreach (PersonalChat personalChat in resultList)
        {
            personalChat.DriverUser = await _globalService.UserService.Get(personalChat.FK_DriverUser ?? "");
            personalChat.PassengerUser = await _globalService.UserService.Get(personalChat.FK_PassengerUser ?? "");
        }
        
        return Ok(resultList);
    }
    
    [HttpGet("GetOpenRequestForTrip/{id}")]
    public async Task<IActionResult> GetOpenRequestForTrip(int id)
    {
        List<TripRequest> tripRequestList = await _globalService.TripRequestService.GetTripRequestsByTripId(id);
        
        return Ok(tripRequestList);
    }
    
    [HttpPut("chat/updateRequest")]
    public async Task<IActionResult> UpdateUser([FromBody] TripRequest tripRequest)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        ActionResultResponseModel result = await _globalService.TripRequestService.Update(tripRequest);
        if (!result.IsSuccess)
        {
            result.Message = "Failed to update request";
            return Ok(result);
        }
        
        if (tripRequest.Status == "Accepted")
        {
            PersonalChat? existingPersonalChat = _globalService.PersonalChatService.GetByCorrelation(tripRequest.FK_PotentialPassenger, tripRequest.FK_Trip);
            if (existingPersonalChat != null) return Ok(result);
            
            PersonalChat newPersonalChat = new();
            newPersonalChat.ID = await _GetNewPersonalChatID();
            newPersonalChat.FK_Trip = tripRequest.FK_Trip;
            newPersonalChat.Trip = await _globalService.TripService.Get(newPersonalChat.FK_Trip);
            newPersonalChat.DriverUser = await _globalService.UserService.Get(newPersonalChat.Trip.FK_Driver);
            newPersonalChat.FK_DriverUser = newPersonalChat.DriverUser.Id;
            newPersonalChat.FK_PassengerUser = tripRequest.FK_PotentialPassenger;
            newPersonalChat.PassengerUser = await _globalService.UserService.Get(tripRequest.FK_PotentialPassenger);
            newPersonalChat.UpdatedAt = DateTime.UtcNow;
            newPersonalChat.LastMessageContent = "";

            await _globalService.PersonalChatService.Create(newPersonalChat);
        }

        result.Message = "Request updated successfully";
        return Ok(result);
    }
    
    [HttpGet("GetTripRequestById/{id}")]
    public async Task<IActionResult> GetTripRequestById(int id)
    {
        TripRequest? tripRequest = await _globalService.TripRequestService.Get(id);
        return Ok(tripRequest);
    }
    
    [HttpGet("GetTripRequest/{passengerId}/{tripId}")]
    public async Task<IActionResult> GetTripRequestById(string passengerId, string tripId)
    {
        int tripIdAsInt = int.Parse(tripId);
        TripRequest? tripRequest = _globalService.TripRequestService.GetByCorrelation(passengerId, tripIdAsInt);
        return Ok(tripRequest);
    }
}