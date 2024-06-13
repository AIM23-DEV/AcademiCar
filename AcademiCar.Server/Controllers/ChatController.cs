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
    
    [HttpPost("Create")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateChat([Required][FromBody] Chat chat)
        => await _globalService.ChatService.Create(chat);
}