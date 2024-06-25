using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class TripStopService : Service<TripStop>
{
    public TripStopService(ITripStopRepository repo) : base(repo) { }


    public override async Task<bool> Validate(TripStop entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No TripStop was sent.");

        return validationDictionary.IsValid;
    }
}