using System.ComponentModel.DataAnnotations;
using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class Vehicle : Entity
{
    [Required]
    public string Type { get; set; }

    [Required]
    public int Seats { get; set; }

    [Required]
    public string Color { get; set; }

    public byte[] Picture { get; set; }

    [Required]
    public string Features { get; set; }

    public bool IsElectric { get; set; }

    [Required]
    public string FK_User { get; set; }
}