using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class TripPassengerService : Service<TripPassenger>
{
    private ITripPassengerRepository _repo;
    public TripPassengerService(ITripPassengerRepository repo) : base(repo)
    {
        _repo = repo;
    }


    public override async Task<bool> Validate(TripPassenger entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No TripPassenger was sent.");

        return validationDictionary.IsValid;
    }
    
    public async Task<List<TripPassenger>> GetConnectionByPassengerID(string id)
        => await _repo.GetConnectionByPassengerID(id);
}