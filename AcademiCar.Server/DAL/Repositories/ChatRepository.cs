using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories
{
    public class ChatRepository : PostgresRepository<Chat>, IChatRepository
    {
        public ChatRepository(PostgresDbContext dbContext) : base(dbContext) {}
    }
}