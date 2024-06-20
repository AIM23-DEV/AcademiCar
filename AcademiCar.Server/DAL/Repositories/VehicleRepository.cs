using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories
{
    public class VehicleRepository : PostgresRepository<Vehicle>, IVehicleRepository
    {
        private readonly PostgresDbContext _dbContext;

        public VehicleRepository(PostgresDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        
        public async Task<List<Vehicle>> GetVehiclesByUserId(string id)
            => _dbContext.Vehicles.Where(v => v.FK_OwnerUser == id).ToList();
    }
}
