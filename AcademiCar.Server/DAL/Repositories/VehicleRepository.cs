using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace AcademiCar.Server.DAL.Repositories
{
    public class VehicleRepository : PostgresRepository<Vehicle>, IVehicleRepository
    {
        private readonly PostgresDbContext _dbContext;

        public VehicleRepository(PostgresDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Vehicle>> GetVehiclesWithUseId(string id)
        {
            return await _dbContext.Vehicles
                .Where(v => v.FK_User == id)
                .ToListAsync();
        }
    }
}
