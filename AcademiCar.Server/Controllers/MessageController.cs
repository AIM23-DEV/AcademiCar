using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

public class MessageController : BaseController<Message>
{
    private IGlobalService _globalService;
    private readonly PostgresDbContext _context;
    
    public MessageController(IGlobalService globals, IHttpContextAccessor accessor, PostgresDbContext context)
        : base(globals.MessageService, accessor)
    {
        _globalService = globals;
        _context = context;
    }
    
    [HttpGet("{id}", Name = "GetMessagebyId")]
    public async Task<ActionResult<Message>> GetTestByIdAsync(int id)
    {
        var entry = await _context.Messages.FindAsync(id);
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