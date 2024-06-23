using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace AcademiCar.Server.DAL.Repositories;

public class BalanceRepository : PostgresRepository<Balance>, IBalanceRepository
{
    private readonly PostgresDbContext _dbContext;

    public BalanceRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Balance?> GetBalanceByUserIdAsync(string userId)
    {
        return await _dbContext.Balances.FirstOrDefaultAsync(v => v.FK_User == userId);
    }
}

