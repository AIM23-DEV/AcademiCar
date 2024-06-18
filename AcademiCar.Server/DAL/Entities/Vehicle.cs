using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class Vehicle : Entity
{
    public string Type { get; set; }
    public int Seats { get; set; }
    public string Color { get; set; }
    public string PictureSrc { get; set; }
    public string Features { get; set; }
    public bool IsElectric { get; set; }
    
    public string FK_User { get; set; }
}