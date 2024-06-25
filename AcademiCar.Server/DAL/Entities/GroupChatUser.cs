using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;
using Newtonsoft.Json;

namespace AcademiCar.Server.DAL.Entities;

public class GroupChatUser : Entity
{
    [ForeignKey("FK_GroupChat")]
    public int FK_GroupChat { get; set; }
    
    [ForeignKey("FK_User")]
    public string FK_User { get; set; }
}