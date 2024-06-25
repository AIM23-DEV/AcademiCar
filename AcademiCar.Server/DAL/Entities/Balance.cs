using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class Balance : Entity
{
    public string FK_User { get; set; }
    public decimal Amount { get; set; }
}