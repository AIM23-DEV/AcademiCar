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
    public async Task<Services.Response.ActionResultResponseModel> CreateChat([Required][FromBody] PersonalMessage personalMessage)
        => await _globalService.PersonalMessageService.Create(personalMessage);
    
    
    [HttpPost("CreateGroupMessage")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateMessage([Required][FromBody] GroupMessage groupMessage)
        => await _globalService.GroupMessageService.Create(groupMessage);
    
    //Chat & ChatUser
    
    
}