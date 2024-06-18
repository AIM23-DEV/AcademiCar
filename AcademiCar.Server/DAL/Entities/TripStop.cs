using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class TripStop : Entity
{
    [ForeignKey("FK_Trip")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public Trip Trip { get; set; }
    public int FK_Trip { get; set; }
    
    [ForeignKey("FK_StopAddress")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public Address StopAddress { get; set; }
    public int FK_StopAddress { get; set; }
    
    public float StopDurationInMinutes { get; set; }
}