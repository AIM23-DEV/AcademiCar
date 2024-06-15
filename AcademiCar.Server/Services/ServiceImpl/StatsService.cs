using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class StatsService : Service<Stats>
{
    public StatsService(IStatsRepository repo) : base(repo) { }


    public override async Task<bool> Validate(Stats entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Trip was sent.");

        return validationDictionary.IsValid;
    }
}