using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IGroupChatRepository : IPostgresRepository<GroupChat>
{
    Task<List<GroupChat>> GetGroupChatsByTripId(int id);
}