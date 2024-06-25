using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface ITransactionRepository : IPostgresRepository<Transaction>
{
    Task<List<Transaction>> GetTransactionByUserId(string id);
    Task<bool> DeleteTransactionsByUserId(string userId);
}