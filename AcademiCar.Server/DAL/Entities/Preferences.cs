using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademiCar.Server.DAL.Entities
{
    public class Preferences : Entity
    {
        [ForeignKey("FK_User")]
        [JsonIgnore][JsonProperty(Required = Required.Default)] public User User { get; set; }
        public int FK_User { get; set; }
    }
}
