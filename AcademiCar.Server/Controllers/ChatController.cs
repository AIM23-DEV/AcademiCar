using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/chat")]
public class ChatController : ControllerBase
{
    private IGlobalService _globalService;
    
    public ChatController(IGlobalService globals)
    {
        _globalService = globals;
    }
    
    [HttpPost("CreatePersonalMessage")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreatePersonalMessage([Required][FromBody] PersonalMessage personalMessage)
        => await _globalService.PersonalMessageService.Create(personalMessage);
    
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
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateGroupMessage([Required][FromBody] GroupMessage groupMessage)
        => await _globalService.GroupMessageService.Create(groupMessage);
    
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
    
    [HttpPost("CreateGroupChat")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateGroupChat([Required][FromBody] GroupChat groupChat)
        => await _globalService.GroupChatService.Create(groupChat);
    
    [HttpGet("GetGroupChatById")]
    public async Task<IActionResult> GetGroupChatById(string id)
    {
        int idAsInt = int.Parse(id);
        GroupChat? groupChat = await _globalService.GroupChatService.Get(idAsInt);
        
        if (groupChat == null)
            return NotFound();
        
        groupChat.Trip = await _globalService.TripService.Get(groupChat.FK_Trip);
        
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
        foreach (var groupChat in groupChatList)
        {
            if (groupChat == null) break;
            groupChat.Trip = await _globalService.TripService.Get(groupChat.FK_Trip);
            groupChat.LastMessageContent = _globalService.UnitOfWork.GroupMessages.FilterBy(message => message.FK_GroupChat == groupChat.ID).Last().Content;
        }
        
        return Ok(groupChatList);
    }
    
    [HttpPost("CreatePersonalChat")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreatePersonalChat([Required][FromBody] PersonalChat personalChat)
        => await _globalService.PersonalChatService.Create(personalChat);
    
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
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateGroupChatUser([Required][FromBody] GroupChatUser groupChatUser)
        => await _globalService.GroupChatUserService.Create(groupChatUser);
    
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

        return Ok(resultList);
    }
}