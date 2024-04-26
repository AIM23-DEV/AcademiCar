namespace AcademiCar.Server.DAL.Entities
{
    public class FavoriteUser : Entity
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int FavUserId { get; set; }
        public User FavUser { get; set; }
    }
}
