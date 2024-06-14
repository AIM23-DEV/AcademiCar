using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/message")]
public class MessageController : ControllerBase
{
    private IGlobalService _globalService;
    
    public MessageController(IGlobalService globals)
    {
        _globalService = globals;
    }
    
    
    [HttpGet("{id}", Name = "GetMessagebyId")]
    public async Task<ActionResult<Message>> GetTestByIdAsync(int id)
    {
        Message? entry = await _globalService.MessageService.Get(id);
        if (entry == null)
        {
            return NotFound();
        }
        
        return entry;
    }
    
    [HttpPost("Create")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
    public async Task<Services.Response.ActionResultResponseModel> CreateMessage([Required][FromBody] Message message)
        => await _globalService.MessageService.Create(message);
}