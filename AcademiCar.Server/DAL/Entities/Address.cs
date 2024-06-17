using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class Address : Entity
{
    public string Street { get; set; }
    public int Number { get; set; }
    public int ZIP { get; set; }
    public string Place { get; set; }
    public string Longitude { get; set; }
    public string Latitude { get; set; }
}