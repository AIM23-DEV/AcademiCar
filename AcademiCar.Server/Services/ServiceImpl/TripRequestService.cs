using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class TripRequestService : Service<TripRequest>
{
    private ITripRequestRepository _repo;

    public TripRequestService(ITripRequestRepository repo) : base(repo)
    {
        _repo = repo;
    }
    
    public override async Task<bool> Validate(TripRequest entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No TripRequest was sent.");

        return validationDictionary.IsValid;
    }
    
    public async Task<List<TripRequest>> GetTripRequestsByTripId(int id)
        => await _repo.GetTripRequestsByTripId(id);
}