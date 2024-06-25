using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class TravelPreferenceService : Service<TravelPreference>
{
    private ITravelPreferenceRepository _repo;

    public TravelPreferenceService(ITravelPreferenceRepository repo) : base(repo)
    {
        _repo = repo;
    }

    
    public override async Task<bool> Validate(TravelPreference entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No TravelPreference was sent.");

        return validationDictionary.IsValid;
    }
    
    public async Task<List<TravelPreference>> GetByPreferenceId(int id)
        => await _repo.GetByPreferencesId(id);
}