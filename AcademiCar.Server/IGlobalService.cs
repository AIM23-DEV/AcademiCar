using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.ServiceImpl;

namespace AcademiCar.Server;

public interface IGlobalService
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
}