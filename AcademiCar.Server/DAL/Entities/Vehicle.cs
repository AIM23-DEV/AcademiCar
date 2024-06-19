using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class Vehicle : Entity
{
    public string Type { get; set; }
    public int Seats { get; set; }
    public string Color { get; set; }
    public string PictureSrc { get; set; }
    public string FK_User { get; set; }
    public string Brand_Model { get; set; }
    public string Fuel_Consumption { get; set; }
    public string License_Plate { get; set; }
    public string Fuel_Type { get; set; }
    public bool AC { get; set; }
    public bool Led { get; set; }
    public bool Vehicle_Inspection { get; set; }
    public bool Automatic { get; set; }
    public bool Ski_Bag { get; set; }
    public bool Leather { get; set; }
    public bool Seat_Heating { get; set; }
    public bool Cruise_Control { get; set; }
    public bool Bike_Rack { get; set; }
    public bool Hand_luggage { get; set; }
    public bool Nounting_Roof { get; set; }
    public bool Animals { get; set; }
    public bool Suitcase { get; set; }
    public bool Ski { get; set; }
    public bool Plants { get; set; }
    public bool Other { get; set; }
}