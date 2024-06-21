using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class GroupChat : Entity
{
    [ForeignKey("FK_Trip")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore]
    public Trip Trip { get; set; }

    public int FK_Trip { get; set; }

    public DateTime UpdatedAt { get; set; }

    [NotMapped] [JsonIgnore] public string? LastMessageContent { get; set; }
}