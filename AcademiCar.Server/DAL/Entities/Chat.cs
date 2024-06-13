using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class Chat : Entity
{
    [ForeignKey("FK_Trip")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public Trip Trip { get; set; }
    public int FK_Trip { get; set; }
    
    [ForeignKey("FK_User")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User User { get; set; }
    public string FK_User { get; set; }
    
    public bool HasMoreThan2 { get; set; }
    public DateTime UpdatedAt { get; set; }
}