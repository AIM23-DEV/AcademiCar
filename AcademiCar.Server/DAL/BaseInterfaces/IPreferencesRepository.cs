using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IPreferencesRepository : IPostgresRepository<Preferences>
{
    Task<List<Preferences>> GetByUserId(string id);
}