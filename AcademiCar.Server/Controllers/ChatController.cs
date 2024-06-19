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
    
    
    [HttpGet("{id}", Name = "GetChatbyId")]
    public async Task<ActionResult<Chat>> GetTestByIdAsync(int id)
    {
        Chat? entry = await _globalService.ChatService.Get(id);
        if (entry == null)
        {
            return NotFound();
        }
        
        return entry;
    }
    
    [HttpGet("user/{userId}", Name = "GetChatsByUserId")]
    public async Task<ActionResult<List<Chat>>> GetChatsByUserId(string userId)
    {
        List<Chat> entries = _globalService.UnitOfWork.Chats.FilterBy(chat => chat.FK_User == userId).ToList();
        if (entries.Count == 0)
        {
            return NotFound();
        }

        // Load Users into the Chats
        foreach (var chat in entries)
        {
            chat.User = await _globalService.UserService.Get(chat.FK_User);
        }
        return entries;
    }
    
    [HttpPost("Create")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateChat([Required][FromBody] Chat chat)
        => await _globalService.ChatService.Create(chat);
}