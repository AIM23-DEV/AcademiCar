using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class VehicleService : Service<Vehicle>
{
    private IVehicleRepository _repo;

    public VehicleService(IVehicleRepository repo) : base(repo)
    {
        _repo = repo;
    }


    public override async Task<bool> Validate(Vehicle entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Vehicle was sent.");

        return validationDictionary.IsValid;
    }

    public async Task<List<Vehicle>> GetVehiclesByUserId(string id)
        => await _repo.GetVehiclesByUserId(id);
}