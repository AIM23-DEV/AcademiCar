using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class FavoriteUserService : Service<FavoriteUser>
{
    public FavoriteUserService(IFavoriteUserRepository repo) : base(repo) { }


    public override async Task<bool> Validate(FavoriteUser entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Trip was sent.");

        return validationDictionary.IsValid;
    }
}