using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class TripService : Service<Trip>
{
    private ITripRepository _repo;

    public TripService(ITripRepository repo) : base(repo)
    {
        _repo = repo;
    }

    public override async Task<bool> Validate(Trip entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Trip was sent.");

        return validationDictionary.IsValid;
    }
    
    public async Task<List<Trip>> GetTripsByDriverId(string id)
        => await _repo.GetTripsByUserId(id);
}