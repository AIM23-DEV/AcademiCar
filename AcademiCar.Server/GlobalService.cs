using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.ServiceImpl;

namespace AcademiCar.Server;

public class GlobalService : IGlobalService
{
    public IUnitOfWork UnitOfWork { get; set; }

    public AddressService AddressService { get; set; }
    public CarlosService CarlosService { get; set; }
    public ChatService ChatService { get; set; }
    public FavoriteUserService FavoriteUserService { get; set; }
    public MessageService MessageService { get; set; }
    public PreferencesService PreferencesService { get; set; }
    public RatingService RatingService { get; set; }
    public StatsService StatsService { get; set; }
    public TripService TripService { get; set; }
    public TripRequestService TripRequestService { get; set; }
    public VehicleService VehicleService { get; set; }
    public UserService UserService { get; set; }

    public GlobalService(IUnitOfWork uow)
    {
        UnitOfWork = uow;

        AddressService = new AddressService(UnitOfWork.Addresses);
        CarlosService = new CarlosService(UnitOfWork.Carlos);
        ChatService = new ChatService(UnitOfWork.Chats);
        FavoriteUserService = new FavoriteUserService(UnitOfWork.FavoriteUsers);
        MessageService = new MessageService(UnitOfWork.Messages);
        PreferencesService = new PreferencesService(UnitOfWork.Preferences);
        RatingService = new RatingService(UnitOfWork.Ratings);
        StatsService = new StatsService(UnitOfWork.Stats);
        TripService = new TripService(UnitOfWork.Trips);
        TripRequestService = new TripRequestService(UnitOfWork.TripRequests);
        VehicleService = new VehicleService(UnitOfWork.Vehicles);
        UserService = new UserService(UnitOfWork.Users);
    }
}