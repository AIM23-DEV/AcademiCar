using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories
{
    public class PreferencesRepository : PostgresRepository<Preferences>, IPreferencesRepository
    {
        public PreferencesRepository(PostgresDbContext dbContext) : base(dbContext) {}
    }
}
