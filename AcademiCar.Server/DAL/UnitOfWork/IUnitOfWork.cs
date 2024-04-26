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
        IVehicleRepository Vehicles { get; }
        ITripRepository Trips { get; }
        ITripRequestRepository TripRequests { get; }
        IAddressRepository Addresses { get; }

        Task<int> SaveChangesAsync();
    }
}
