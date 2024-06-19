using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Repositories;

namespace AcademiCar.Server.DAL.UnitOfWork;

public class UnitOfWork : IUnitOfWork
{
    public PostgresDbContext Context { get; private set; } = null;
    public UnitOfWork(PostgresDbContext context)
    {
        Context = context;
    }

    public IAddressRepository Addresses => new AddressRepository(Context);
    public ICarlosRepository Carlos => new CarlosRepository(Context);
    public IChatRepository Chats => new ChatRepository(Context);
    public IFavoriteUserRepository FavoriteUsers => new FavoriteUserRepository(Context);
    public IInterestPreferenceRepository InterestPreferences => new InterestPreferenceRepository(Context);
    public IMessageRepository Messages => new MessageRepository(Context);
    public IMusicPreferenceRepository MusicPreferences => new MusicPreferenceRepository(Context);
    public IPreferencesRepository Preferences => new PreferencesRepository(Context);
    public IRatingRepository Ratings => new RatingRepository(Context);
    public IStatsRepository Stats => new StatsRepository(Context);
    public ITravelPreferenceRepository TravelPreferences => new TravelPreferenceRepository(Context);
    public ITripRepository Trips => new TripRepository(Context);
    public ITripPassengerRepository TripPassengers => new TripPassengerRepository(Context);
    public ITripRequestRepository TripRequests => new TripRequestRepository(Context);
    public ITripStopRepository TripStops => new TripStopRepository(Context);
    public IUserRepository Users => new UserRepository(Context);
    public IVehicleRepository Vehicles => new VehicleRepository(Context);
    public IBalanceRepository Balances => new BalanceRepository(Context);
        
    public async Task<int> SaveChangesAsync() => await Context.SaveChangesAsync();
}