using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class Rating : Entity
{
    [ForeignKey("FK_User")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User User { get; set; }
    public string FK_User { get; set; }

    public bool IsDriver { get; set; }
    public bool IsPassenger { get; set; }
    public int Score { get; set; }
}