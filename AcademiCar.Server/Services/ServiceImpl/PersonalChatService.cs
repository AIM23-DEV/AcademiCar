using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class PersonalChatService : Service<PersonalChat>
{
    private IPersonalChatRepository _repo;
    public PersonalChatService(IPersonalChatRepository repo) : base(repo)
    {
        _repo = repo;
    }

    public override async Task<bool> Validate(PersonalChat entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No Chat was sent.");

        return validationDictionary.IsValid;
    }
    
    
    public async Task<List<PersonalChat>> GetPersonalChatsByDriverId(string id)
        => await _repo.GetPersonalChatsByDriverId(id);
    
    public async Task<List<PersonalChat>> GetPersonalChatsByPassengerId(string id)
        => await _repo.GetPersonalChatsByPassengerId(id);
    
    public PersonalChat? GetByCorrelation(string userId, int tripId)
        => _repo.FilterBy(pc => pc.FK_PassengerUser == userId && pc.FK_Trip == tripId).FirstOrDefault();
}