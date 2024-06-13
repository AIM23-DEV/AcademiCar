using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.Services.ServiceImpl
{

    public class MessageService : Service<Message>
    {
        public MessageService(IUnitOfWork uow, IMessageRepository repo, IGlobalService globals)
            : base(uow, repo, globals) { }


        public override async Task<bool> Validate(Message entity)
        {
            if (entity == null) validationDictionary.AddError("Empty", "No Message was sent.");

            return validationDictionary.IsValid;
        }
    }
}