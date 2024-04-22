﻿using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories
{
    public class VehicleRepository : PostgresRepository<Vehicle>, IVehicleRepository
    {
        public VehicleRepository(PostgresDbContext dbContext) : base(dbContext) {}
    }
}