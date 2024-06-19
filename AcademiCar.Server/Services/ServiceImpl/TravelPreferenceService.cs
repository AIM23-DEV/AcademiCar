using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class TravelPreferenceService : Service<TravelPreference>
{
    public TravelPreferenceService(ITravelPreferenceRepository repo) : base(repo) { }


    public override async Task<bool> Validate(TravelPreference entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No TravelPreference was sent.");

        return validationDictionary.IsValid;
    }
}