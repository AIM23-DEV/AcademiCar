using AcademiCar.Server.DAL.BaseInterfaces;

namespace AcademiCar.Server.DAL.UnitOfWork
{
    public interface IUnitOfWork
    {
        PostgresDbContext Context { get; }

        IAddressRepository Addresses { get; }
        ICarlosRepository Carlos { get;  }
        IGroupChatRepository GroupChats { get; }
        IGroupChatUserRepository GroupChatUsers { get; }
        IGroupMessageRepository GroupMessages { get; }
        IFavoriteUserRepository FavoriteUsers { get; }
        IInterestPreferenceRepository InterestPreferences { get; }
        IPersonalChatRepository PersonalChats { get; }
        IPersonalMessageRepository PersonalMessages { get; }
        IMusicPreferenceRepository MusicPreferences { get; }
        IPreferencesRepository Preferences { get; }
        IRatingRepository Ratings { get; }
        IStatsRepository Stats { get; }
        ITravelPreferenceRepository TravelPreferences { get; }
        ITripPassengerRepository TripPassengers { get; }
        ITripRepository Trips { get; }
        ITripRequestRepository TripRequests { get; }
        ITripStopRepository TripStops { get; }
        IUserRepository Users { get; }
        IVehicleRepository Vehicles { get; }
        IBalanceRepository Balances { get; }
        ITransactionRepository Transactions { get; }

        Task<int> SaveChangesAsync();
    }
}