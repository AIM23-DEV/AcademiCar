using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class TravelPreferenceRepository : PostgresRepository<TravelPreference>, ITravelPreferenceRepository
{
    private readonly PostgresDbContext _dbContext;

    public TravelPreferenceRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }
    
    
    public async Task<List<TravelPreference>> GetByPreferencesId(int id)
        => _dbContext.TravelPreferences.Where(v => v.FK_Preferences == id).ToList();
}