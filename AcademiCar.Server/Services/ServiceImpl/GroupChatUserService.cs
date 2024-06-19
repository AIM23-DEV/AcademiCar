using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class GroupChatUserService : Service<GroupChatUser>
{
    public GroupChatUserService(IGroupChatUserRepository repo) : base(repo) { }


    public override async Task<bool> Validate(GroupChatUser entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No ChatUser was sent.");

        return validationDictionary.IsValid;
    }
}