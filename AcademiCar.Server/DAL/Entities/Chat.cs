namespace AcademiCar.Server.DAL.Entities;

public class Chat : Entity
{
    public int ChatId { get; set; }
    public int TripId { get; set; }
    public int UserId { get; set; }
    public int MessageId { get; set; }
    public bool Moreas2 { get; set; }
    public DateTime UpdatedAt { get; set; }
}