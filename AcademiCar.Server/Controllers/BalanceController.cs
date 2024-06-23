using AcademiCar.Server.DAL.Enums;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Mvc;

namespace AcademiCar.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BalanceController : ControllerBase
    {
        private IGlobalService _globalService;

        public BalanceController(IGlobalService globals)
        {
            _globalService = globals;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetBalanceByUserId(string userId)
        {
            Balance? balance = await _globalService.BalanceService.GetBalanceByUserId(userId);
            if (balance == null) return NotFound("User has no balance");

            return Ok(balance);
        }

        [HttpGet("transactions/{userId}")]
        public async Task<IActionResult> GetTransactionByUserId(string userId)
        {
            List<Transaction> transactions = await _globalService.TransactionService.GetTransactionByUserId(userId);
            if (transactions.Count == 0) return NotFound("User has no transactions");

            return Ok(transactions);
        }

        [HttpPost("charge")]
        public async Task<IActionResult> ChargeBalance([FromBody] TransactionRequest request)
        {
            var response = await _globalService.BalanceService.ChargeBalanceAsync(request.FK_User, request.Amount);
            var responseTransaction =
                await _globalService.TransactionService.CreateTransactionAsync(request.FK_User, request.Amount,
                    TransactionType.Charge, request.transactionSource);
            if (response.IsSuccess && responseTransaction.IsSuccess)
            {
                return Ok();
            }

            return BadRequest("Failed to charge balance or save Transaction.");
        }

        [HttpPost("book")]
        public async Task<IActionResult> Book([FromBody] TransactionRequest request)
        {
            var response = await _globalService.BalanceService.BookAsync(request.FK_User, request.Amount);
            var responseTransaction =
                await _globalService.TransactionService.CreateTransactionAsync(request.FK_User, request.Amount,
                    TransactionType.Book,
                    request.transactionSource);
            if (response.IsSuccess && responseTransaction.IsSuccess)
            {
                return Ok();
            }

            return BadRequest("Insufficient balance.");
        }

        [HttpDelete("transactions/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ActionResultResponseModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        public async Task<IActionResult> DeleteTransactionsForUser(string userId)
        {
            ActionResultResponseModel result = await _globalService.TransactionService.DeleteAllForUser(userId);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }


        public class TransactionRequest
        {
            public string FK_User { get; set; }
            public decimal Amount { get; set; }
            public TransactionSource transactionSource { get; set; }
        }
    }
}