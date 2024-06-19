using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class GroupMessage : Entity
{
    [ForeignKey("FK_SenderUser")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User SenderUser { get; set; }
    public string FK_SenderUser { get; set; }
    
    [ForeignKey("FK_GroupChat")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public GroupChat GroupChat { get; set; }
    public int FK_GroupChat { get; set; }
    
    public string? Content { get; set; }
    public DateTime SentAt { get; set; }
}