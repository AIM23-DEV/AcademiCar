using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class TripRepository : PostgresRepository<Trip>, ITripRepository
{
    private readonly PostgresDbContext _dbContext;

    public TripRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }
    
    
    public async Task<List<Trip>> GetTripsByUserId(string id)
        => _dbContext.Trips.Where(v => v.FK_Driver == id).ToList();
}