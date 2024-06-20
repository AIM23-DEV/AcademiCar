using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IVehicleRepository : IPostgresRepository<Vehicle>
{
    Task<List<Vehicle>> GetVehiclesByUserId(string id);
}