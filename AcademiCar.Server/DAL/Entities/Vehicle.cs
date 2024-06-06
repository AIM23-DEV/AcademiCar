using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace AcademiCar.Server.DAL.Entities
{
    public class Vehicle : Entity
    {
        public string Type { get; set; }
        public int Seats { get; set; }
        public string Color { get; set; }
        public byte[] Picture { get; set; }
        public string Features { get; set; }
        public bool IsElectric { get; set; }

        [ForeignKey("FK_User")]
        [JsonProperty(Required = Required.Default)]
        [JsonIgnore] public User User { get; set; }
        public string FK_User { get; set; }
    }
}
