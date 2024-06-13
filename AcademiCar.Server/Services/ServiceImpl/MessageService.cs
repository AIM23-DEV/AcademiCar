using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class MessageService : Service<Message>
{
    public MessageService(IMessageRepository repo) : base(repo) { }


    public override async Task<bool> Validate(Message entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No Message was sent.");

        return validationDictionary.IsValid;
    }
}