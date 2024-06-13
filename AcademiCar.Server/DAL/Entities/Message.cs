namespace AcademiCar.Server.DAL.Entities;

public class Message
{
    public int MessageId { get; set; }
    public int UserId { get; set; }
    public int ChatId { get; set; }
    public int TripRequestId { get; set; }
    public string? Content { get; set; }
    public DateTime SentAt { get; set; }
}