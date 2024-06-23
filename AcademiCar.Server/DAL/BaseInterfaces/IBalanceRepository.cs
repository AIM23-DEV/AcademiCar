using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IBalanceRepository : IPostgresRepository<Balance>
{
    Task<Balance> GetBalanceByUserIdAsync(string id);
}