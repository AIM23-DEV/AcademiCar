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

        public async Task<int> SaveChangesAsync() => await Context.SaveChangesAsync();
    }
}
