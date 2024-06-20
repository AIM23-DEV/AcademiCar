using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class GroupChatUser : Entity
{
    [ForeignKey("FK_GroupChat")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public GroupChat GroupChat { get; set; }
    public int FK_GroupChat { get; set; }
    
    [ForeignKey("FK_User")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User User { get; set; }
    public string FK_User { get; set; }
}