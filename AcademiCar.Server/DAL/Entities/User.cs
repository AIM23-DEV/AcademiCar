using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace AcademiCar.Server.DAL.Entities
{
    public class User : Entity
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte[] Picture { get; set; }

        [ForeignKey("FK_Stats")]
        [JsonProperty(Required = Required.Default)]
        [JsonIgnore] public Stats Stats { get; set; }
        public int FK_Stats { get; set; }

        public List<FavoriteUser> Favorits { get; set; }
    }
}
