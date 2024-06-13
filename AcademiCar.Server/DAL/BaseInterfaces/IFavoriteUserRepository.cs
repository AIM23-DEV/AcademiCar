using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.Repositories;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IFavoriteUserRepository : IPostgresRepository<FavoriteUser>;