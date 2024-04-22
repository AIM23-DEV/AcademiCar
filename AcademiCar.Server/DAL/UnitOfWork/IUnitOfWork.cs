﻿using AcademiCar.Server.DAL.Repositories;

namespace AcademiCar.Server.DAL.UnitOfWork
{
    public interface IUnitOfWork
    {
        PostgresDbContext Context { get; }

        IUserRepository Users { get; }
        IFavoriteUserRepository FavoriteUsers { get; }
        IStatsRepository Stats { get; }
        IRatingRepository Ratings { get; }
        IPreferencesRepository Preferences { get; }

        Task<int> SaveChangesAsync();
    }
}