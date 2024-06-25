using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IMusicPreferenceRepository : IPostgresRepository<MusicPreference>
{
    Task<List<MusicPreference>> GetByPreferencesId(int id);
}