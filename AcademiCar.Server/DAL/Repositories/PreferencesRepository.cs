using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class PreferencesRepository : PostgresRepository<Preferences>, IPreferencesRepository
{
    private readonly PostgresDbContext _dbContext;

    public PreferencesRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }
    
    
    public async Task<List<Preferences>> GetByUserId(string id)
        => _dbContext.Preferences.Where(v => v.FK_User == id).ToList();
}