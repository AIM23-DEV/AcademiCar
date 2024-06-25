using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class GroupMessageService : Service<GroupMessage>
{
    public GroupMessageService(IGroupMessageRepository repo) : base(repo) { }


    public override async Task<bool> Validate(GroupMessage entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No Message was sent.");

        return validationDictionary.IsValid;
    }
}