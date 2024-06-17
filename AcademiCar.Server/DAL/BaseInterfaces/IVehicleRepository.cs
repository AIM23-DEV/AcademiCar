using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IVehicleRepository : IPostgresRepository<Vehicle>
{
    Task<IEnumerable<Vehicle>> GetVehiclesWithUseId(string id);
}