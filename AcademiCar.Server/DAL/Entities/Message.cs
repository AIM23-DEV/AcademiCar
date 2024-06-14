using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class Message : Entity
{
    [ForeignKey("FK_User")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User User { get; set; }
    public string FK_User { get; set; }
    
    [ForeignKey("FK_Chat")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public Chat Chat { get; set; }
    public int FK_Chat { get; set; }
    
    [ForeignKey("FK_TripRequest")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public TripRequest TripRequest { get; set; }
    public int FK_TripRequest { get; set; }
    
    public string? Content { get; set; }
    public DateTime SentAt { get; set; }
}