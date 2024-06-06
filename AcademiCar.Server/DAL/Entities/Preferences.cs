using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademiCar.Server.DAL.Entities
{
    public class Preferences : Entity
    {
        [ForeignKey("User")]
        [JsonProperty(Required = Required.Default)]
        public string FK_User { get; set; } 

        [JsonIgnore]
        public User User { get; set; }
    }
}