using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class AddressService : Service<Address>
{
    public AddressService(IAddressRepository repo) : base(repo) { }


    public override async Task<bool> Validate(Address entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Address was sent.");

        return validationDictionary.IsValid;
    }
}