using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;


namespace AcademiCar.Server.DAL.Repositories;

public class TransactionRepository : PostgresRepository<Transaction>, ITransactionRepository
{
    private readonly PostgresDbContext _dbContext;

    public TransactionRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Transaction>> GetTransactionByUserId(string id)
        => _dbContext.Transactions.Where(v => v.FK_User == id).OrderByDescending(v => v.TransactionDate).ToList();
    
    public async Task<bool> DeleteTransactionsByUserId(string userId)
    {
        var transactions = _dbContext.Transactions.Where(t => t.FK_User == userId).ToList();
        if (transactions.Any())
        {
            _dbContext.Transactions.RemoveRange(transactions);
            await _dbContext.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
