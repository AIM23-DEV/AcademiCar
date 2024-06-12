using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.Repositories;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.Services.ServiceImpl
{
    public class TripService : Service<Trip>
    {
        public TripService(IUnitOfWork uow, ITripRepository repo, IGlobalService globals)
            : base(uow, repo, globals) { }


        public override async Task<bool> Validate(Trip entity)
        {
            if (entity == null) validationDictionary.AddError("Empty", "No Trip was sent.");

            return validationDictionary.IsValid;
        }
    }
}
