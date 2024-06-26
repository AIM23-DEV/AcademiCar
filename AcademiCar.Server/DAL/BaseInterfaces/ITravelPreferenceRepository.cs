using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface ITravelPreferenceRepository : IPostgresRepository<TravelPreference>
{
    Task<List<TravelPreference>> GetByPreferencesId(int id);
}