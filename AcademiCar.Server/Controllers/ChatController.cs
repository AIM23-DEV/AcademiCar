using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

public class ChatController : BaseController<Chat>
{
    private IGlobalService _globalService;
    private readonly PostgresDbContext _context;
    
    public ChatController(IGlobalService globals, IHttpContextAccessor accessor, PostgresDbContext context)
        : base(globals.ChatService, accessor)
    {
        _globalService = globals;
        _context = context;
    }
    
    [HttpGet("{id}", Name = "GetChatbyId")]
    public async Task<ActionResult<Chat>> GetTestByIdAsync(int id)
    {
        var entry = await _context.Chats.FindAsync(id);
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