using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademiCar.Server.DAL.Entities;

public class User : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? PictureSrc { get; set; }
    public string? Email { get; set; }

    [ForeignKey("FK_Address")]
    [JsonIgnore] public Address Address { get; set; }
    public int FK_Address { get; set; }
    
    [ForeignKey("FK_Stats")]
    [JsonIgnore] public Stats Stats { get; set; }
    public int FK_Stats { get; set; }
}