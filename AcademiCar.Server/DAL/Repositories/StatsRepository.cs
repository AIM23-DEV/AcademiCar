using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories
{
    public class StatsRepository : PostgresRepository<Stats>, IStatsRepository
    {
        public StatsRepository(PostgresDbContext dbContext) : base(dbContext) {}
    }
}
