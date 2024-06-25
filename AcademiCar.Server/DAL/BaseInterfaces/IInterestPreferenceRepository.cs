using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IInterestPreferenceRepository : IPostgresRepository<InterestPreference>
{
    Task<List<InterestPreference>> GetByPreferencesId(int id);
}