namespace AcademiCar.Server.DAL.Entities
{
    public class FavoriteUser : Entity
    {
        public User User { get; set; }

        public string FavUserId { get; set; }
        public User FavUser { get; set; }
    }
}
