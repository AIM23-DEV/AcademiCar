using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.Repositories;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.Services.ServiceImpl
{
    public class UserService : Service<User>
    {
        public UserService(IUnitOfWork uow, IUserRepository repo, IGlobalService globals)
            : base(uow, repo, globals) {}


        public override async Task<bool> Validate(User entity)
        {
            if (entity == null) validationDictionary.AddError("Empty", "No User was sent.");

            return validationDictionary.IsValid;
        }
    }
}
