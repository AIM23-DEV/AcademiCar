using AcademiCar.Server.DAL.BaseClasses;
using AcademiCar.Server.DAL.Enums;

namespace AcademiCar.Server.DAL.Entities;

public class Transaction : Entity
{
    public string FK_User { get; set; }
    public TransactionType TransactionType { get; set; }
    public TransactionSource TransactionSource { get; set; }
    public decimal Amount { get; set; }
    public DateTime TransactionDate { get; set; }
}