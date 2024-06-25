using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class InterestPreferenceRepository : PostgresRepository<InterestPreference>, IInterestPreferenceRepository
{
    private readonly PostgresDbContext _dbContext;

    public InterestPreferenceRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }
    
    
    public async Task<List<InterestPreference>> GetByPreferencesId(int id)
        => _dbContext.InterestPreferences.Where(v => v.FK_Preferences == id).ToList();
}