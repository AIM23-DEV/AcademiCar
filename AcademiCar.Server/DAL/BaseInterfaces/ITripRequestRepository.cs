﻿using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface ITripRequestRepository : IPostgresRepository<TripRequest>
{
    Task<List<TripRequest>> GetTripRequestsByTripId(int id);
}