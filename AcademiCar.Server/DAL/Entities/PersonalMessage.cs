using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class PersonalMessage : Entity
{
    [ForeignKey("FK_SenderUser")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public User SenderUser { get; set; }
    public string FK_SenderUser { get; set; }
    
    [ForeignKey("FK_PersonalChat")]
    [JsonProperty(Required = Required.Default)]
    [JsonIgnore] public PersonalChat PersonalChat { get; set; }
    public int FK_PersonalChat { get; set; }
    
    public string? Content { get; set; }
    public DateTime SentAt { get; set; }
}