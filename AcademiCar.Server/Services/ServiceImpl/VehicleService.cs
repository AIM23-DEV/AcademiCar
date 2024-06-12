using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.Repositories;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.Services.ServiceImpl
{
    public class VehicleService : Service<Vehicle>
    {
        public VehicleService(IUnitOfWork uow, IVehicleRepository repo, IGlobalService globals)
            : base(uow, repo, globals) { }


        public override async Task<bool> Validate(Vehicle entity)
        {
            if (entity == null) validationDictionary.AddError("Empty", "No Vehicle was sent.");

            return validationDictionary.IsValid;
        }
    }
}
