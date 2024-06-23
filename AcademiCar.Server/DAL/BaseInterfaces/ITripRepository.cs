using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface ITripRepository : IPostgresRepository<Trip>
{
    Task<List<Trip>> GetTripsByUserId(string id);
}