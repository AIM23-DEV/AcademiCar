using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.ServiceImpl;

namespace AcademiCar.Server;

public interface IGlobalService
{
    public IUnitOfWork UnitOfWork { get; set; }

    public AddressService AddressService { get; set; }
    public CarlosService CarlosService { get; set; }
    public GroupChatService GroupChatService { get; set; }
    public PersonalChatService PersonalChatService { get; set; }

    public FavoriteUserService FavoriteUserService { get; set; }
    public InterestPreferenceService InterestPreferenceService { get; set; }
    public GroupMessageService GroupMessageService { get; set; }
    public PersonalMessageService PersonalMessageService { get; set; }
    public GroupChatUserService GroupChatUserService { get; set; }

    public MusicPreferenceService MusicPreferenceService { get; set; }
    public PreferencesService PreferencesService { get; set; }
    public RatingService RatingService { get; set; }
    public StatsService StatsService { get; set; }
    public TravelPreferenceService TravelPreferenceService { get; set; }
    public TripService TripService { get; set; }
    public TripPassengerService TripPassengerService { get; set; }
    public TripRequestService TripRequestService { get; set; }
    public TripStopService TripStopService { get; set; }
    public UserService UserService { get; set; }
    public VehicleService VehicleService { get; set; }
}