using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class MusicPreferenceRepository : PostgresRepository<MusicPreference>, IMusicPreferenceRepository
{
    private readonly PostgresDbContext _dbContext;

    public MusicPreferenceRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }
    
    
    public async Task<List<MusicPreference>> GetByPreferencesId(int id)
        => _dbContext.MusicPreferences.Where(v => v.FK_Preferences == id).ToList();
}