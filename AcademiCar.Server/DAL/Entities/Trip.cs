using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class Trip : Entity
{
    public string Title { get; set; }

    [ForeignKey("FK_Driver")]
    public string FK_Driver { get; set; }

    [ForeignKey("FK_Vehicle")]
    public int FK_Vehicle { get; set; }

    [ForeignKey("FK_StartAddress")]
    public int FK_StartAddress { get; set; }

    [ForeignKey("FK_EndAddress")]
    public int FK_EndAddress { get; set; }

    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int AvailableSeats { get; set; }
    public float Price { get; set; }
    public string PaymentMethod { get; set; }
    public string Status { get; set; }
}