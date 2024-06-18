using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class MusicPreferenceService : Service<MusicPreference>
{
    public MusicPreferenceService(IMusicPreferenceRepository repo) : base(repo) { }


    public override async Task<bool> Validate(MusicPreference entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No MusicPreference was sent.");

        return validationDictionary.IsValid;
    }
}