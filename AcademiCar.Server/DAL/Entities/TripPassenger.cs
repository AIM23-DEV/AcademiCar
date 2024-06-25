using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class TripPassenger : Entity
{
    [ForeignKey("FK_Trip")]
    public int FK_Trip { get; set; } 
    
    [ForeignKey("FK_PassengerUser")]
    public string FK_PassengerUser { get; set; } 
}