using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class TripPassengerRepository : PostgresRepository<TripPassenger>, ITripPassengerRepository
{
    private readonly PostgresDbContext _dbContext;
    public TripPassengerRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<List<TripPassenger>> GetConnectionByPassengerID(string id)
        => _dbContext.TripPassengers.Where(v => v.FK_PassengerUser == id).ToList();
}