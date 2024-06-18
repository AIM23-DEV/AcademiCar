﻿using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.ServiceImpl;

namespace AcademiCar.Server;

public class GlobalService : IGlobalService
{
    public IUnitOfWork UnitOfWork { get; set; }

    public AddressService AddressService { get; set; }
    public CarlosService CarlosService { get; set; }
    public ChatService ChatService { get; set; }
    public FavoriteUserService FavoriteUserService { get; set; }
    public InterestPreferenceService InterestPreferenceService { get; set; }
    public MessageService MessageService { get; set; }
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

    public GlobalService(IUnitOfWork uow)
    {
        UnitOfWork = uow;

        AddressService = new AddressService(UnitOfWork.Addresses);
        CarlosService = new CarlosService(UnitOfWork.Carlos);
        ChatService = new ChatService(UnitOfWork.Chats);
        FavoriteUserService = new FavoriteUserService(UnitOfWork.FavoriteUsers);
        InterestPreferenceService = new InterestPreferenceService(UnitOfWork.InterestPreferences);
        MessageService = new MessageService(UnitOfWork.Messages);
        MusicPreferenceService = new MusicPreferenceService(UnitOfWork.MusicPreferences);
        PreferencesService = new PreferencesService(UnitOfWork.Preferences);
        RatingService = new RatingService(UnitOfWork.Ratings);
        StatsService = new StatsService(UnitOfWork.Stats);
        TravelPreferenceService = new TravelPreferenceService(UnitOfWork.TravelPreferences);
        TripService = new TripService(UnitOfWork.Trips);
        TripPassengerService = new TripPassengerService(UnitOfWork.TripPassengers);
        TripRequestService = new TripRequestService(UnitOfWork.TripRequests);
        TripStopService = new TripStopService(UnitOfWork.TripStops);
        VehicleService = new VehicleService(UnitOfWork.Vehicles);
        UserService = new UserService(UnitOfWork.Users);
    }
}