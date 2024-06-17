using System.Security.Cryptography;
using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class CarlosService : Service<Carlos>
{
    public CarlosService(ICarlosRepository repo) : base(repo) { }

    
    public override async Task<bool> Validate(Carlos entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Carlos :(");

        return validationDictionary.IsValid;
    }


    public async Task<Carlos> GetRandomCarlos()
    {
        Carlos randomCarlos = new();
        
        List<Carlos?> allCarlosInDb = await Get();
        List<Carlos> allCarlos = [..allCarlosInDb.Where(c => c != null)];
        if (allCarlos.Count == 0) return randomCarlos;
        
        int rng = RandomNumberGenerator.GetInt32(0, allCarlos.Count);
        randomCarlos = allCarlos[rng];

        return randomCarlos;
    }
}