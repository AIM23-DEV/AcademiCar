using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class AddressService : Service<Address>
{
    private IAddressRepository _repo;
    public AddressService(IAddressRepository repo) : base(repo)
    {
        _repo = repo;
    }


    public override async Task<bool> Validate(Address entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Address was sent.");

        return validationDictionary.IsValid;
    }
    
    
    public Address? GetByStreetAndPlace(string street, string place)
        => _repo.FilterBy(a => a.Street.Contains(street) && a.Place.Contains(place)).FirstOrDefault();
}