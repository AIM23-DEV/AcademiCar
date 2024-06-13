using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class VehicleService : Service<Vehicle>
{
    public VehicleService(IVehicleRepository repo) : base(repo) { }


    public override async Task<bool> Validate(Vehicle entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Vehicle was sent.");

        return validationDictionary.IsValid;
    }
}