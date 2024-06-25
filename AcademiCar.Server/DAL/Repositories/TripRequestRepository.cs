using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class TripRequestRepository : PostgresRepository<TripRequest>, ITripRequestRepository
{
    private readonly PostgresDbContext _dbContext;
    public TripRequestRepository(PostgresDbContext dbContext) : base(dbContext) 
    {
        _dbContext = dbContext;
    }
    
    public async Task<List<TripRequest>> GetTripRequestsByTripId(int id)
        => _dbContext.TripRequests.Where(v => v.FK_Trip == id).ToList();
}