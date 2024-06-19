using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class PersonalChatService : Service<PersonalChat>
{
    public PersonalChatService(IPersonalChatRepository repo) : base(repo) { }


    public override async Task<bool> Validate(PersonalChat entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No Chat was sent.");

        return validationDictionary.IsValid;
    }
}