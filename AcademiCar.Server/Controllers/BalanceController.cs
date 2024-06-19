using AcademiCar.Server.Services.ServiceImpl;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BalanceController : ControllerBase
    {
        private readonly BalanceService _balanceService;

        public BalanceController(BalanceService balanceService)
        {
            _balanceService = balanceService;
        }

        [HttpPost("charge")]
        public async Task<IActionResult> ChargeBalance([FromBody] Request request)
        {
            var response = await _balanceService.ChargeBalanceAsync(request.FK_User, request.Amount);
            if (response.IsSuccess)
            {
                return Ok();
            }
            return BadRequest("Failed to charge balance.");
        }

        [HttpPost("book")]
        public async Task<IActionResult> Book([FromBody] Request request)
        {
            var response = await _balanceService.BookAsync(request.FK_User, request.Amount);
            if (response.IsSuccess)
            {
                return Ok();
            }
            return BadRequest("Insufficient balance.");
        }
    }

    public class Request
    {
        public string FK_User { get; set; }
        public decimal Amount { get; set; }
    }
}

