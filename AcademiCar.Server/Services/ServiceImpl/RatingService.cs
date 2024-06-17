using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class RatingService : Service<Rating>
{
    public RatingService(IRatingRepository repo) : base(repo) { }


    public override async Task<bool> Validate(Rating entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No Trip was sent.");

        return validationDictionary.IsValid;
    }
}