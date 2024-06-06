using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademiCar.Server.DAL.Entities
{
    public class IdentityEntity : IdentityUser, IEntity
    {
        [NotMapped]
        public int ID { get; set; }
    }
}