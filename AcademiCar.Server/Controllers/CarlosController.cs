using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers;

[ApiController]
[Route("api/carlos")]
public class CarlosController : BaseController<Carlos>
{
    private IGlobalService _globalService;
    
    public CarlosController(IGlobalService globals, IHttpContextAccessor accessor)
        : base(globals.CarlosService, accessor)
    {
        _globalService = globals;
    }
    
    
    [HttpGet]
    public async Task<ActionResult<Carlos>> GetCarlos()
    {
        Carlos carlos = await _globalService.CarlosService.GetRandomCarlos();
        return Ok(carlos);
    }
}