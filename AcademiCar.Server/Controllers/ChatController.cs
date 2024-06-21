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
    
    [HttpGet("GetGroupChats")]
    public async Task<IActionResult> GetGroupChats()
    {
        List<GroupChat?> groupChatList = await _globalService.GroupChatService.Get();
        
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
    
    [HttpGet("GetPersonalChats")]
    public async Task<IActionResult> GetPersonalChats()
    {
        List<PersonalChat?> personalChatList = await _globalService.PersonalChatService.Get();
        
        if (!personalChatList.Any())
            return NotFound();

        personalChatList.Sort((a, b) => a.UpdatedAt.CompareTo(b.UpdatedAt));
        foreach (var personalChat in personalChatList)
        {
            if (personalChat == null) break;
            personalChat.DriverUser = await _globalService.UserService.Get(personalChat.FK_DriverUser ?? "");
            personalChat.PassengerUser = await _globalService.UserService.Get(personalChat.FK_PassengerUser ?? "");
            personalChat.LastMessageContent = _globalService.UnitOfWork.PersonalMessages.FilterBy(message => message.FK_PersonalChat == personalChat.ID).OrderBy(message => message.SentAt).Last().Content;
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
}