using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class Rating : Entity
{
    [ForeignKey("FK_RatingUser")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User RatingUser { get; set; }
    public string FK_RatingUser { get; set; }

    [ForeignKey("FK_RatedUser")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User RatedUser { get; set; }
    public string FK_RatedUser { get; set; }
    
    public bool IsDriver { get; set; }
    public bool IsPassenger { get; set; }
    public int Score { get; set; }
    public string Comment { get; set; }
}