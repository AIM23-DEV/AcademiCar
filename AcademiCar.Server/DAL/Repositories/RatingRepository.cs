using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories
{
    public class RatingRepository : PostgresRepository<Rating>, IRatingRepository
    {
        public RatingRepository(PostgresDbContext dbContext) : base(dbContext) {}
    }
}
