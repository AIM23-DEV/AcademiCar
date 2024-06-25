using System.ComponentModel.DataAnnotations;

public class UpdateVehicleDto
{
    [Required]
    public int ID { get; set; }

    [Required]
    public string FK_OwnerUser { get; set; }

    public string Type { get; set; }
    public int Seats { get; set; }
    public string Color { get; set; }
    public string PictureSrc { get; set; }
    public string BrandModel { get; set; }
    public string FuelConsumption { get; set; }
    public string LicensePlate { get; set; }
    public string FuelType { get; set; }
    public bool HasAC { get; set; }
    public bool HasLed { get; set; }
    public bool HasVehicleInspection { get; set; }
    public bool HasAutomatic { get; set; }
    public bool HasSkiBag { get; set; }
    public bool HasLeather { get; set; }
    public bool HasSeatHeating { get; set; }
    public bool HasCruiseControl { get; set; }
    public bool HasBikeRack { get; set; }
    public bool HasHandLuggageSpace { get; set; }
    public bool HasMountingOnRoof { get; set; }
    public bool HasAnimalSpace { get; set; }
    public bool HasSuitcaseSpace { get; set; }
    public bool HasSkiSpace { get; set; }
    public bool HasPlantSpace { get; set; }
    public bool HasOtherSpace { get; set; }
}