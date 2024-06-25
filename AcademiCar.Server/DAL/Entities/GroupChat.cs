using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class GroupChat : Entity
{
    [ForeignKey("FK_Trip")]
    public int FK_Trip { get; set; }
    
    public string TripTitle { get; set; }
    public string LastMessageContent { get; set; }
    public DateTime UpdatedAt { get; set; }
}