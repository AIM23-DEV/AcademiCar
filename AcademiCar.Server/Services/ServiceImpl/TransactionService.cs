using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Enums;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;

namespace AcademiCar.Server.Services.ServiceImpl
{
    public class TransactionService : Service<Transaction>
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionService(ITransactionRepository transactionRepo) :
            base(transactionRepo)
        {
            _transactionRepository = transactionRepo;
        }

        public override async Task<bool> Validate(Transaction transaction)
        {
            if (transaction.Amount == null)
            {
                validationDictionary.AddError("Transaction", "Transaction amount....");
                return false;
            }

            return true;
        }

        public async Task<ActionResultResponseModel> CreateTransactionAsync(string userId, decimal amount,
            TransactionType transactionType, TransactionSource transactionSource)
        {
            ActionResultResponseModel model = new();
            try
            {
                var transaction = new Transaction();

                bool isValid = await Validate(transaction);
                if (!isValid) throw new Exception("Invalid!");

                transaction.Amount = amount;
                transaction.FK_User = userId;
                transaction.TransactionDate = DateTime.UtcNow;
                transaction.TransactionType = transactionType;
                transaction.TransactionSource = transactionSource;

                await _transactionRepository.InsertAsync(transaction);

                model.IsSuccess = true;
            }
            catch (Exception)
            {
                model.IsSuccess = false;
            }

            return model;
        }

        public async Task<List<Transaction>> GetTransactionByUserId(string id)
            => await _transactionRepository.GetTransactionByUserId(id);

        public async Task<ActionResultResponseModel> DeleteAllForUser(string userId)
        {
            ActionResultResponseModel model = new();
            try
            {
                bool isDeleted = await _transactionRepository.DeleteTransactionsByUserId(userId);
                if (!isDeleted)
                {
                    model.IsSuccess = false;
                    model.Message = "No transactions found for the user.";
                }
                else
                {
                    model.IsSuccess = true;
                    model.Message = "All transactions deleted successfully.";
                }
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.Message = $"Failed to delete transactions: {ex.Message}";
            }

            return model;
        }
    }
}