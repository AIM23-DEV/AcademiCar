using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IPersonalChatRepository : IPostgresRepository<PersonalChat>
{
    Task<List<PersonalChat>> GetPersonalChatsByDriverId(string id);
    Task<List<PersonalChat>> GetPersonalChatsByPassengerId(string id);
}