using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class ChatService : Service<Chat>
{
    public ChatService(IChatRepository repo) : base(repo) { }


    public override async Task<bool> Validate(Chat entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No Chat was sent.");

        return validationDictionary.IsValid;
    }
}