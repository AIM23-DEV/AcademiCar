using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class PreferencesService : Service<Preferences>
{
    public PreferencesService(IPreferencesRepository repo) : base(repo) { }


    public override async Task<bool> Validate(Preferences entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Trip was sent.");

        return validationDictionary.IsValid;
    }
}