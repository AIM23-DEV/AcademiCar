using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories;

public class PersonalChatRepository : PostgresRepository<PersonalChat>, IPersonalChatRepository
{
    private readonly PostgresDbContext _dbContext;
    public PersonalChatRepository(PostgresDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }
    
    
    public async Task<List<PersonalChat>> GetPersonalChatsByDriverId(string id)
        => _dbContext.PersonalChats.Where(v => v.FK_DriverUser == id).ToList();
    
    public async Task<List<PersonalChat>> GetPersonalChatsByPassengerId(string id)
        => _dbContext.PersonalChats.Where(v => v.FK_PassengerUser == id).ToList();
}