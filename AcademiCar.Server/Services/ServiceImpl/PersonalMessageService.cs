using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.Services.ServiceImpl;

public class PersonalMessageService : Service<PersonalMessage>
{
    public PersonalMessageService(IPersonalMessageRepository repo) : base(repo) { }


    public override async Task<bool> Validate(PersonalMessage entity)
    {
        if (entity == null) validationDictionary.AddError("Empty", "No Message was sent.");

        return validationDictionary.IsValid;
    }
}