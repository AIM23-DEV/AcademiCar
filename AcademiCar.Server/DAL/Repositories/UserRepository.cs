using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories
{
    public class UserRepository : PostgresRepository<User>, IUserRepository
    {
        public UserRepository(PostgresDbContext dbContext) : base(dbContext) {}
    }
}
