using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class GroupChatService : Service<GroupChat>
{
    public GroupChatService(IGroupChatRepository repo) : base(repo) { }


    public override async Task<bool> Validate(GroupChat entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No Chat was sent.");

        return validationDictionary.IsValid;
    }
}