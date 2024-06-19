using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class TripPassengerService : Service<TripPassenger>
{
    public TripPassengerService(ITripPassengerRepository repo) : base(repo) { }


    public override async Task<bool> Validate(TripPassenger entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No TripPassenger was sent.");

        return validationDictionary.IsValid;
    }
}