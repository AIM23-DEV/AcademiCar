using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class PreferencesService : Service<Preferences>
{
    private IPreferencesRepository _repo;

    public PreferencesService(IPreferencesRepository repo) : base(repo)
    {
        _repo = repo;
    }

    
    public override async Task<bool> Validate(Preferences entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Trip was sent.");

        return validationDictionary.IsValid;
    }
    
    
    public async Task<List<Preferences>> GetByUserId(string id)
        => await _repo.GetByUserId(id);
}