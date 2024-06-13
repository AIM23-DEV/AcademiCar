using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class FavoriteUser : Entity
{
    [ForeignKey("FK_UserId")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User User { get; set; }
    public string FK_UserId { get; set; }

    [ForeignKey("FK_FavUserId")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User FavUser { get; set; }
    public string FK_FavUserId { get; set; }
}