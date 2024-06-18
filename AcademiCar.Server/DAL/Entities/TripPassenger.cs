using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class TripPassenger : Entity
{
    [ForeignKey("FK_Trip")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public Trip Trip { get; set; }
    public int FK_Trip { get; set; } 
    
    [ForeignKey("FK_PassengerUser")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User PassengerUser { get; set; }
    public string FK_PassengerUser { get; set; } 
}