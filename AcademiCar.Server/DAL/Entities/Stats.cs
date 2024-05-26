namespace AcademiCar.Server.DAL.Entities
{
    public class Stats : Entity
    {
        public int NrTrips { get; set; }
        public float CO2Savings { get; set; }
        public int DriverRating { get; set; }
        public float PassengerRating { get; set; }
    }
}
