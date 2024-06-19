using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class InterestPreferenceService : Service<InterestPreference>
{
    public InterestPreferenceService(IInterestPreferenceRepository repo) : base(repo) { }


    public override async Task<bool> Validate(InterestPreference entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No InterestPreference was sent.");

        return validationDictionary.IsValid;
    }
}