using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademiCar.Server.DAL.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte[]? Picture { get; set; }
        public string? Email { get; set; }

        [ForeignKey("FK_Stats")]
        [JsonIgnore] public Stats Stats { get; set; }
        public int FK_Stats { get; set; }

        public List<FavoriteUser>? Favorits { get; set; }
    }
}