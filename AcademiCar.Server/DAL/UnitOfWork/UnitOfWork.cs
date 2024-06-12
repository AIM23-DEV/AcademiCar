using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Repositories;

namespace AcademiCar.Server.DAL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public PostgresDbContext Context { get; private set; } = null;
        public UnitOfWork(PostgresDbContext context)
        {
            Context = context;
        }

        public IUserRepository Users => new UserRepository(Context);
        public IFavoriteUserRepository FavoriteUsers => new FavoriteUserRepository(Context);
        public IStatsRepository Stats => new StatsRepository(Context);
        public IRatingRepository Ratings => new RatingRepository(Context);
        public IPreferencesRepository Preferences => new PreferencesRepository(Context);
        public IVehicleRepository Vehicles => new VehicleRepository(Context);
        public ITripRepository Trips => new TripRepository(Context);
        public ITripRequestRepository TripRequests => new TripRequestRepository(Context);
        public IAddressRepository Addresses => new AddressRepository(Context);

        public async Task<int> SaveChangesAsync() => await Context.SaveChangesAsync();
    }
}
