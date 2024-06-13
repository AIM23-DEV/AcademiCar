using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.Services.ServiceImpl
{
    public class ChatService : Service<Chat>
    {
        public ChatService(IUnitOfWork uow, IChatRepository repo, IGlobalService globals)
            : base(uow, repo, globals) { }


        public override async Task<bool> Validate(Chat entity)
        {
            if (entity == null) validationDictionary.AddError("Empty", "No Chat was sent.");

            return validationDictionary.IsValid;
        }
    }
}