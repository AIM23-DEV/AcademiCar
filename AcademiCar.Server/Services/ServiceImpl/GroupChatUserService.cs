using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class GroupChatUserService : Service<GroupChatUser>
{
    private IGroupChatUserRepository _repo;
    public GroupChatUserService(IGroupChatUserRepository repo) : base(repo)
    {
        _repo = repo;
    }


    public override async Task<bool> Validate(GroupChatUser entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No ChatUser was sent.");

        return validationDictionary.IsValid;
    }
    
    public GroupChatUser? GetByCorrelation(string userId, int groupChatId)
        => _repo.FilterBy(gcu => gcu.FK_User == userId && gcu.FK_GroupChat == groupChatId).FirstOrDefault();
}