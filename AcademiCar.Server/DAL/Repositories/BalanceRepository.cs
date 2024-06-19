using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class BalanceRepository : PostgresRepository<Balance>, IBalanceRepository
{
    private readonly PostgresDbContext _dbContext;

    public BalanceRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }


}