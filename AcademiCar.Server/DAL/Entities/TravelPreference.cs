using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class TravelPreference : Entity
{
    [ForeignKey("FK_Preferences")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public Preferences Preferences { get; set; }
    public int FK_Preferences { get; set; } 
    
    public string PreferenceText { get; set; }
    public string IconType { get; set; }
}