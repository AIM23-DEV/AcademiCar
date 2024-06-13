using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.ServiceImpl;

namespace AcademiCar.Server
{
    public class GlobalService : IGlobalService
    {
        public IUnitOfWork UnitOfWork { get; set; }

        public CarlosService CarlosService { get; set; }
        public UserService UserService { get; set; }
        public VehicleService VehicleService { get; set; }
        public TripService TripService { get; set; }


        public GlobalService(IUnitOfWork uow)
        {
            UnitOfWork = uow;

            UserService = new UserService(UnitOfWork.Users);
            VehicleService = new VehicleService(UnitOfWork.Vehicles);
            TripService = new TripService(UnitOfWork.Trips);
        }
    }
}
