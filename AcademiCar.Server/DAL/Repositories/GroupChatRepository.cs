using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class GroupChatRepository : PostgresRepository<GroupChat>, IGroupChatRepository
{
    private readonly PostgresDbContext _dbContext;
    public GroupChatRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }
    
    
    public async Task<List<GroupChat>> GetGroupChatsByTripId(int id)
        => _dbContext.GroupChats.Where(v => v.FK_Trip == id).ToList();
}