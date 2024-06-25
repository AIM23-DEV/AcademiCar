using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;

namespace AcademiCar.Server.Services.ServiceImpl
{
    public class BalanceService : Service<Balance>
    {
        private readonly IBalanceRepository _balanceRepository;

        public BalanceService(IBalanceRepository balanceRepo) :
            base(balanceRepo)
        {
            _balanceRepository = balanceRepo;
        }

        public override async Task<bool> Validate(Balance balance)
        {
            if (balance.Amount < 0)
            {
                validationDictionary.AddError("Amount", "Balance amount cannot be negative.");
                return false;
            }

            return true;
        }
        
        //TODO add this function call to trip service, when trip was accepted to drivers * passenger

        public async Task<ActionResultResponseModel> ChargeBalanceAsync(string userId, decimal amount)
        {
            ActionResultResponseModel model = new();
            try
            {
                var balance = await _balanceRepository.FindAsync(b => b.FK_User == userId);
                if (balance == null)
                {
                    balance = new Balance { FK_User = userId, Amount = 0 };
                }

                balance.Amount += amount;

                bool isValid = await Validate(balance);
                if (!isValid) throw new Exception("Invalid!");

                if (balance.ID == 0)
                {
                    await _balanceRepository.InsertAsync(balance);
                }
                else
                {
                    await _balanceRepository.UpdateAsync(balance);
                }

                model.IsSuccess = true;
            }
            catch (Exception)
            {
                model.IsSuccess = false;
            }

            return model;
        }

        //TODO add this function call to trip service, when trip was accepted to passenggers
        public async Task<ActionResultResponseModel> BookAsync(string userId, decimal amount)
        {
            ActionResultResponseModel model = new();
            try
            {
                var balance = await _balanceRepository.FindAsync(b => b.FK_User == userId);
                if (balance == null || balance.Amount < amount)
                {
                    model.IsSuccess = false;
                    return model;
                }

                balance.Amount -= amount;

                bool isValid = await Validate(balance);
                if (!isValid) throw new Exception("Invalid!");

                await _balanceRepository.UpdateAsync(balance);

                model.IsSuccess = true;
            }
            catch (Exception)
            {
                model.IsSuccess = false;
            }

            return model;
        }

        public async Task<Balance> GetBalanceByUserId(string id)
            => await _balanceRepository.GetBalanceByUserIdAsync(id);
    }
}