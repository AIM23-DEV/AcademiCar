using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class Stats : Entity
{
    public int DriverKilometres { get; set; }
    public int PassengerKilometres { get; set; }
    public int NrTrips { get; set; }
    public float CO2Savings { get; set; }
}