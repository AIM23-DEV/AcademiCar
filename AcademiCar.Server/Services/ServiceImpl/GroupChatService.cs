using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class GroupChatService : Service<GroupChat>
{
    private IGroupChatRepository _repo;
    public GroupChatService(IGroupChatRepository repo) : base(repo)
    {
        _repo = repo;
    }

    
    public override async Task<bool> Validate(GroupChat entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No Chat was sent.");

        return validationDictionary.IsValid;
    }
    
    public async Task<List<GroupChat>> GetGroupChatsByTripId(int id)
        => await _repo.GetGroupChatsByTripId(id);
}