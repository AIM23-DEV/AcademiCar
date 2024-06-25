using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class InterestPreferenceService : Service<InterestPreference>
{
    private IInterestPreferenceRepository _repo;

    public InterestPreferenceService(IInterestPreferenceRepository repo) : base(repo)
    {
        _repo = repo;
    }


    public override async Task<bool> Validate(InterestPreference entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No InterestPreference was sent.");

        return validationDictionary.IsValid;
    }
    
    public async Task<List<InterestPreference>> GetByPreferenceId(int id)
        => await _repo.GetByPreferencesId(id);
}