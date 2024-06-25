using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface ITripPassengerRepository : IPostgresRepository<TripPassenger>
{
    Task<List<TripPassenger>> GetConnectionByPassengerID(string id);
}