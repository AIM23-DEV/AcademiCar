using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademiCar.Server.DAL.Entities
{
    public class TripRequest : Entity
    {
        [ForeignKey("FK_Trip")]
        [JsonProperty(Required = Required.Default)]
        [JsonIgnore] public Trip Trip { get; set; }
        public int FK_Trip { get; set; }

        [ForeignKey("FK_PotentialPassenger")]
        [JsonProperty(Required = Required.Default)]
        [JsonIgnore] public User PotentialPassenger { get; set; }
        public string FK_PotentialPassenger { get; set; }

        public string Comment { get; set; }
        public string Status { get; set; }
    }
}
