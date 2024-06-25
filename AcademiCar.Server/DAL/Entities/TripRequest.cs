using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using AcademiCar.Server.DAL.BaseClasses;

namespace AcademiCar.Server.DAL.Entities;

public class TripRequest : Entity
{
    [ForeignKey("FK_Trip")]
    public int FK_Trip { get; set; }

    [ForeignKey("FK_PotentialPassenger")]
    public string FK_PotentialPassenger { get; set; }

    public string Comment { get; set; }
    public string Status { get; set; }
}