using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class TripRequestService : Service<TripRequest>
{
    public TripRequestService(ITripRequestRepository repo) : base(repo) { }


    public override async Task<bool> Validate(TripRequest entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No TripRequest was sent.");

        return validationDictionary.IsValid;
    }
}