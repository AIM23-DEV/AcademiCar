using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class TripRequestRepository : PostgresRepository<TripRequest>, ITripRequestRepository
{
    public TripRequestRepository(PostgresDbContext dbContext) : base(dbContext) {}
}