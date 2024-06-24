using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Tests.BaseClasses;
using NUnit.Framework;

namespace AcademiCar.Server.Tests;

[TestFixture, Order(2)]
public class CreatePresentationDataTest : BaseUnitTest
{
    [TestCase(ExpectedResult = true), Order(1)]
    public async Task<bool> CreateTestAddress()
    {
        try
        {
            Address? existingTestAddress = await _unitOfWork.Addresses.FindByIdAsync(1);
            if (existingTestAddress != null) return true;
            
            foreach (Address address in _GetAddresses())
                await _unitOfWork.Addresses.InsertAsync(address);

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Address creation failed: {e}");
            return false;
        }
    }
    
    [Test (ExpectedResult = true), Order(2)]
    public async Task<bool> CreateTestStatsAndUser()
    {
        try
        {
            Stats? existingTestStats = await _unitOfWork.Stats.FindByIdAsync(1);
            if (existingTestStats != null) return true;
            
            foreach (Stats stats in _GetStats())
                await _unitOfWork.Stats.InsertAsync(stats);

            foreach (User user in _GetUsers())   
                await _unitOfWork.Users.InsertAsync(user);

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Stats and User creation failed: {e}");
            return false;
        }
    }

    [Test (ExpectedResult = true), Order(3)]
    public async Task<bool> CreateTestVehicle()
    {
        try
        {
            Vehicle? existingTestVehicle = await _unitOfWork.Vehicles.FindByIdAsync(1);
            if (existingTestVehicle != null) return true;
            
            foreach (Vehicle vehicle in _GetVehicles())
                await _unitOfWork.Vehicles.InsertAsync(vehicle);

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Vehicle creation failed: {e}");
            return false;
        }
    }

    [TestCase(ExpectedResult = true), Order(4)]
    public async Task<bool> CreateTestTrip()
    {
        try
        {
            Trip? existingTestTrip = await _unitOfWork.Trips.FindByIdAsync(1);
            if (existingTestTrip != null) return true;
            
            foreach (Trip trip in _GetTrips())
                await _unitOfWork.Trips.InsertAsync(trip);

            foreach (TripPassenger tripPassenger in _GetTripPassengers())
                await _unitOfWork.TripPassengers.InsertAsync(tripPassenger);
            
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Trip creation failed: {e}");
            return false;
        }
    }

    [Test (ExpectedResult = true), Order(5)]
    public async Task<bool> CreateTestTripRequest()
    {
        try
        {
            TripRequest? existingTripRequest = await _unitOfWork.TripRequests.FindByIdAsync(1);
            if (existingTripRequest != null) return true;
            
            foreach (TripRequest tripRequest in _GetTripRequests())
                await _unitOfWork.TripRequests.InsertAsync(tripRequest);
            
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"TripRequest creation failed: {e}");
            return false;
        }
    }

    [Test (ExpectedResult = true)]
    public async Task<bool> CreateTestRatings()
    {
        try
        {
            Rating? existingRating = await _unitOfWork.Ratings.FindByIdAsync(1);
            if (existingRating != null) return true;
            
            foreach (Rating rating in _GetRatings())
                await _unitOfWork.Ratings.InsertAsync(rating);
            
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Rating creation failed: {e}");
            return false;
        }
    }

    [Test (ExpectedResult = true)]
    public async Task<bool> CreateTestPreferences()
    {
        try
        {
            Preferences? existingPreferences = await _unitOfWork.Preferences.FindByIdAsync(1);
            if (existingPreferences != null) return true;
            
            foreach (Preferences preferences in _GetPreferences())
                await _unitOfWork.Preferences.InsertAsync(preferences);
            
            foreach (MusicPreference musicPreference in _GetMusicPreferences())
                await _unitOfWork.MusicPreferences.InsertAsync(musicPreference);
            
            foreach (InterestPreference interestPreference in _GetInterestPreferences())
                await _unitOfWork.InterestPreferences.InsertAsync(interestPreference);

            foreach (TravelPreference travelPreference in _GetTravelPreferences())
                await _unitOfWork.TravelPreferences.InsertAsync(travelPreference);
            
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Preferences creation failed: {e}");
            return false;
        }
    }
    
    [Test (ExpectedResult = true)]
    public async Task<bool> CreateTestPersonalChatAndMessages()
    {
        try
        {
            PersonalChat? existingChat = await _unitOfWork.PersonalChats.FindByIdAsync(1);
            if (existingChat != null) return true;
            
            foreach (PersonalChat chat in _getPersonalChats())
                await _unitOfWork.PersonalChats.InsertAsync(chat);
            
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Chat and PersonalMessage creation failed: {e}");
            return false;
        }
    }
    
    [Test (ExpectedResult = true)]
    public async Task<bool> CreateTestGroupChatAndMessages()
    {
        try
        {
            GroupChat? existingChat = await _unitOfWork.GroupChats.FindByIdAsync(1);
            if (existingChat != null) return true;
            
            foreach (GroupChat chat in _getGroupChats())
                await _unitOfWork.GroupChats.InsertAsync(chat);

            foreach (GroupChatUser chatUser in _getGroupChatUsers())
                await _unitOfWork.GroupChatUsers.InsertAsync(chatUser);
            
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Chat and PersonalMessage creation failed: {e}");
            return false;
        }
    }
    
    
    #region Data

    private static Address[] _GetAddresses()
    {
        Address address1 = new()
        {
            ID = 1,
            Street = "Hauptbahnhof",
            Number = 1,
            ZIP = 8020,
            Place = "Graz",
            Longitude = "15.4395° E",
            Latitude = "47.0734° N"
        };
    
        Address address2 = new()
        {
            ID = 2,
            Street = "Flughafen",
            Number = 1,
            ZIP = 1010,
            Place = "Wien",
            Longitude = "16.5646° E",
            Latitude = "48.1103° N"
        };
    
        Address address3 = new()
        {
            ID = 3,
            Street = "Bahnhof",
            Number = 1,
            ZIP = 8600,
            Place = "Bruck an der Mur",
            Longitude = "15.2733° E",
            Latitude = "47.4164° N"
        };
    
        Address address4 = new()
        {
            ID = 4,
            Street = "Alte Poststraße",
            Number = 149,
            ZIP = 8020,
            Place = "Graz",
            Longitude = "15.4053° E",
            Latitude = "47.0578° N"
        };

        return [address1, address2, address3, address4];
    }
    private static InterestPreference[] _GetInterestPreferences()
    {
        InterestPreference interest1 = new()
        {
            ID = 1,
            FK_Preferences = 1,
            Interest = "Reisen",
        };
    
        InterestPreference interest2 = new()
        {
            ID = 2,
            FK_Preferences = 1,
            Interest = "Technologie"
        };
    
        InterestPreference interest3 = new()
        {
            ID = 3,
            FK_Preferences = 2,
            Interest = "Singen"
        };
    
        InterestPreference interest4 = new()
        {
            ID = 4,
            FK_Preferences = 2,
            Interest = "Kochen"
        };

        return [interest1, interest2, interest3, interest4];
    }
    private static GroupChat[] _getGroupChats()
    {
        GroupChat chat1 = new()
        {
            ID = 1,
            FK_Trip = 1,
            TripTitle = "Graz -> Wien",
            LastMessageContent = "Super!",
            UpdatedAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-24)
        };
        
        GroupChat chat2 = new()
        {
            ID = 2,
            FK_Trip = 2,
            TripTitle = "Graz -> Graz",
            LastMessageContent = "Bis Dann!",
            UpdatedAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-24)
        };

        return [chat1, chat2];
    }
    private static GroupChatUser[] _getGroupChatUsers()
    {
        GroupChatUser chatUser1 = new()
        {
            ID = 1,
            FK_GroupChat = 1,
            FK_User = "1"
        };
        
        GroupChatUser chatUser2 = new()
        {
            ID = 2,
            FK_GroupChat = 2,
            FK_User = "2"
        };

        return [chatUser1, chatUser2];
    }
    private static MusicPreference[] _GetMusicPreferences()
    {
        MusicPreference music1 = new()
        {
            ID = 1,
            FK_Preferences = 1,
            Genre = "Pop",
        };
        
        MusicPreference music2 = new()
        {
            ID = 2,
            FK_Preferences = 1,
            Genre = "Rock"
        };
        
        MusicPreference music3 = new()
        {
            ID = 3,
            FK_Preferences = 2,
            Genre = "Podcasts"
        };
        
        MusicPreference music4 = new()
        {
            ID = 4,
            FK_Preferences = 3,
            Genre = "Schlager"
        };

        return [music1, music2, music3, music4];
    }
    private static PersonalChat[] _getPersonalChats()
    {
        PersonalChat chat1 = new()
        {
            ID = 1,
            FK_Trip = 1,
            FK_PassengerUser = "2",
            FK_DriverUser = "1",
            UpdatedAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-24)
        };
        
        PersonalChat chat2 = new()
        {
            ID = 2,
            FK_Trip = 2,
            FK_PassengerUser = "3",
            FK_DriverUser = "4",
            UpdatedAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-45)
        };

        return [chat1, chat2];
    }
    private static Preferences[] _GetPreferences()
    {
        Preferences pref1 = new()
        {
            ID = 1,
            FK_User = "1"
        };
        
        Preferences pref2 = new()
        {
            ID = 2,
            FK_User = "2"
        };
        
        Preferences pref3 = new()
        {
            ID = 3,
            FK_User = "3"
        };
        
        Preferences pref4 = new()
        {
            ID = 4,
            FK_User = "4"
        };

        return [pref1, pref2, pref3, pref4];
    }
    private static Rating[] _GetRatings()
    {
        Rating rating1 = new()
        {
            ID = 1,
            FK_RatingUser = "1",
            FK_RatedUser = "2",
            IsDriver = true,
            IsPassenger = false,
            Score = 4,
            Comment = "Good Driver"
        };
        
        Rating rating2 = new()
        {
            ID = 2,
            FK_RatingUser = "2",
            FK_RatedUser = "1",
            IsDriver = false,
            IsPassenger = true,
            Score = 5,
            Comment = "Super Passagier"
        };
        
        Rating rating3 = new()
        {
            ID = 3,
            FK_RatingUser = "2",
            FK_RatedUser = "3",
            IsDriver = false,
            IsPassenger = true,
            Score = 3,
            Comment = "Meh"
        };
        
        Rating rating4 = new()
        {
            ID = 4,
            FK_RatingUser = "3",
            FK_RatedUser = "1",
            IsDriver = false,
            IsPassenger = true,
            Score = 5,
            Comment = "Perfekt!"
        };
        
        Rating rating5 = new()
        {
            ID = 5,
            FK_RatingUser = "4",
            FK_RatedUser = "3",
            IsDriver = true,
            IsPassenger = false,
            Score = 4,
            Comment = "Netter Trip"
        };

        return [rating1, rating2, rating3, rating4, rating5];
    }
    private static Stats[] _GetStats()
    {
        Stats stats1 = new()
        {
            ID = 1,
            DriverKilometres = 100,
            PassengerKilometres = 50,
            NrTrips = 5,
            CO2Savings = 20.0f,
        };

        Stats stats2 = new()
        {
            ID = 2,
            DriverKilometres = 200,
            PassengerKilometres = 150,
            NrTrips = 10,
            CO2Savings = 40.0f,
        };

        Stats stats3 = new()
        {
            ID = 3,
            DriverKilometres = 0,
            PassengerKilometres = 300,
            NrTrips = 15,
            CO2Savings = 60.0f,
        };

        Stats stats4 = new()
        {
            ID = 4,
            DriverKilometres = 500,
            PassengerKilometres = 50,
            NrTrips = 20,
            CO2Savings = 100.0f,
        };

        return [stats1, stats2, stats3, stats4];
    }
    private static TravelPreference[] _GetTravelPreferences()
    {
        TravelPreference travel1 = new()
        {
            ID = 1,
            FK_Preferences = 1,
            PreferenceText = "Kein Rauchen",
            IconType = "NoSmoke",
        };
        
        TravelPreference travel2 = new()
        {
            ID = 2,
            FK_Preferences = 1,
            PreferenceText = "Gesprächig",
            IconType = "Talk",
        };
        
        TravelPreference travel3 = new()
        {
            ID = 3,
            FK_Preferences = 2,
            PreferenceText = "Gesprächig",
            IconType = "Talk",
        };
        
        TravelPreference travel4 = new()
        {
            ID = 4,
            FK_Preferences = 3,
            PreferenceText = "Gesprächig",
            IconType = "Talk",
        };

        return [travel1, travel2, travel3, travel4];
    }
    private static Trip[] _GetTrips()
    {
        Trip trip1 = new()
        {
            ID = 1,
            Title = "Graz -> Wien",
            FK_Driver = "1",
            FK_Vehicle = 1,
            FK_StartAddress = 1,
            FK_EndAddress = 2,
            StartTime = DateTime.UtcNow.AddDays(-1),
            EndTime = DateTime.UtcNow,
            AvailableSeats = 3,
            Price = 20.0f,
            PaymentMethod = "InApp",
            Status = "Open"
        };
        
        Trip trip2 = new()
        {
            ID = 2,
            Title = "Graz -> Graz",
            FK_Driver = "4",
            FK_Vehicle = 4,
            FK_StartAddress = 1,
            FK_EndAddress = 4,
            StartTime = DateTime.UtcNow.AddDays(-2),
            EndTime = DateTime.UtcNow.AddDays(-1),
            AvailableSeats = 4,
            Price = 15.0f,
            PaymentMethod = "InApp",
            Status = "Open"
        };
        
        Trip trip3 = new()
        {
            ID = 3,
            Title = "Bruck an der Mur -> Wien",
            FK_Driver = "4",
            FK_Vehicle = 4,
            FK_StartAddress = 3,
            FK_EndAddress = 2,
            StartTime = DateTime.UtcNow.AddHours(-1.5),
            EndTime = DateTime.UtcNow,
            AvailableSeats = 2,
            Price = 0,
            PaymentMethod = "None",
            Status = "Open"
        };
        
        Trip trip4 = new()
        {
            ID = 4,
            Title = "Graz -> Vienna",
            FK_Driver = "4",
            FK_Vehicle = 4,
            FK_StartAddress = 4,
            FK_EndAddress = 2,
            StartTime = DateTime.UtcNow.AddDays(-2),
            EndTime = DateTime.UtcNow.AddDays(-2).AddHours(6),
            AvailableSeats = 2,
            Price = 20.0f,
            PaymentMethod = "InApp",
            Status = "Open"
        };
        
        return [trip1, trip2, trip3, trip4];
    }
    private static TripPassenger[] _GetTripPassengers()
    {
        TripPassenger tripPassenger1 = new()
        {
            ID = 1,
            FK_Trip = 1,
            FK_PassengerUser = "2"
        };

        TripPassenger tripPassenger2 = new()
        {
            ID = 2,
            FK_Trip = 2,
            FK_PassengerUser = "3"
        };

        TripPassenger tripPassenger3 = new()
        {
            ID = 3,
            FK_Trip = 2,
            FK_PassengerUser = "4"
        };

        TripPassenger tripPassenger4 = new()
        {
            ID = 4,
            FK_Trip = 3,
            FK_PassengerUser = "1"
        };

        return [tripPassenger1, tripPassenger2, tripPassenger3, tripPassenger4];
    }
    private static TripRequest[] _GetTripRequests()
    {
        TripRequest tripRequest1 = new()
        {
            ID = 1,
            FK_Trip = 1,
            FK_PotentialPassenger = "2",
            Comment = "Hallo!",
            Status = "Open"
        };
        
        TripRequest tripRequest2 = new()
        {
            ID = 2,
            FK_Trip = 2,
            FK_PotentialPassenger = "3",
            Comment = "Hey...",
            Status = "Open"
        };
        
        return [tripRequest1, tripRequest2];
    }
    private static User[] _GetUsers()
    {
        User user1 = new()
        {
            Id = "1",
            FirstName = "Max",
            LastName = "Müller",
            PictureSrc = "https://fastly.picsum.photos/id/1012/200/200.jpg?hmac=kENwT0f1ecqbPzBGAw3ITKIrm1xoJdF0oh5tq6nosuM",
            Email = "max.mueller@academi.car",
            FK_Stats = 1,
            FK_Address = 1,
            PhoneNumber = "+43 (0) 650 123 22 33"
        };

        User user2 = new()
        {
            Id = "2",
            FirstName = "Anna",
            LastName = "Schmidt",
            PictureSrc = "https://fastly.picsum.photos/id/996/200/200.jpg?hmac=nRtkfqKyD3p2uHiFO5LmGt31UcH3NKWg80H5yUkZ8_k",
            Email = "anna.schmidt@academi.car",
            FK_Stats = 2,
            FK_Address = 2,
            PhoneNumber = "+43 (0) 664 123 34 56"
        };

        User user3 = new()
        {
            Id = "3",
            FirstName = "Jane",
            LastName = "Smith",
            PictureSrc = "https://fastly.picsum.photos/id/633/200/200.jpg?hmac=3ZyIOtFWRly1tYi_sTXjhSKzDlB-94qs6KCeIdeiCJo",
            Email = "jane.smith@academi.car",
            FK_Stats = 3,
            FK_Address = 3,
            PhoneNumber = "0600 321 21 21"
        };

        User user4 = new()
        {
            Id = "4",
            FirstName = "John",
            LastName = "Doe",
            PictureSrc = "https://fastly.picsum.photos/id/338/200/200.jpg?hmac=5S5SeR5xW8mbN3Ml7wTTJPePX392JafhcFMGm7IFNy0",
            Email = "john.doe@academi.car",
            FK_Stats = 4,
            FK_Address = 4,
            PhoneNumber = "1234 123 12 12"
        };

        return [user1, user2, user3, user4];
    }
    private static Vehicle[] _GetVehicles()
    {
        Vehicle vehicle1 = new()
        {
            ID = 1,
            FK_OwnerUser = "1",
            Type = "Volkswagen",
            Seats = 4,
            Color = "Yellow",
            PictureSrc = "https://fastly.picsum.photos/id/111/200/200.jpg?hmac=2DNMKguV-lXKA_jHBWdu9jslPAWBBtS6wWSUdu-WSiI",
            BrandModel = "Golf",
            FuelConsumption = "5",
            LicensePlate = "GU - 123 FH",
            FuelType = "Diesel",
            HasAC = true,
            HasLed = true,
            HasVehicleInspection = true,
            HasAutomatic = false,
            HasSkiBag = false,
            HasLeather = true,
            HasSeatHeating = true,
            HasCruiseControl = true,
            HasBikeRack = false,
            HasHandLuggageSpace = true,
            HasMountingOnRoof = false,
            HasAnimalSpace = false,
            HasSuitcaseSpace = true,
            HasSkiSpace = false,
            HasPlantSpace = false,
            HasOtherSpace = true,
        };
        
        Vehicle vehicle2 = new()
        {
            ID = 2,
            FK_OwnerUser = "2",
            Type = "Mitsubishi",
            Seats = 5,
            Color = "Red",
            PictureSrc = "https://fastly.picsum.photos/id/892/200/200.jpg?hmac=lMI1NzfAzgWlBV0lCCLYXsxRxsq5Mwr-RK9K6AId4X4",
            BrandModel = "Outlander",
            FuelConsumption = "8",
            LicensePlate = "WI - 456 AB",
            FuelType = "Petrol",
            HasAC = true,
            HasLed = true,
            HasVehicleInspection = true,
            HasAutomatic = true,
            HasSkiBag = true,
            HasLeather = true,
            HasSeatHeating = true,
            HasCruiseControl = true,
            HasBikeRack = true,
            HasHandLuggageSpace = true,
            HasMountingOnRoof = true,
            HasAnimalSpace = true,
            HasSuitcaseSpace = true,
            HasSkiSpace = true,
            HasPlantSpace = true,
            HasOtherSpace = true,
        };
        
        Vehicle vehicle3 = new()
        {
            ID = 3,
            FK_OwnerUser = "3",
            Type = "Vespa",
            Seats = 2,
            Color = "Silver",
            PictureSrc = "https://fastly.picsum.photos/id/519/200/200.jpg?hmac=7MwcBjyXrRX5GB6GuDATVm_6MFDRmZaSK7r5-jqDNS0",
            BrandModel = "GTS 300",
            FuelConsumption = "3",
            LicensePlate = "BR - 789 CD",
            FuelType = "Petrol",
            HasAC = false,
            HasLed = false,
            HasVehicleInspection = false,
            HasAutomatic = true,
            HasSkiBag = false,
            HasLeather = true,
            HasSeatHeating = false,
            HasCruiseControl = false,
            HasBikeRack = false,
            HasHandLuggageSpace = true,
            HasMountingOnRoof = false,
            HasAnimalSpace = false,
            HasSuitcaseSpace = false,
            HasSkiSpace = false,
            HasPlantSpace = false,
            HasOtherSpace = true,
        };

        Vehicle vehicle4 = new()
        {
            ID = 4,
            FK_OwnerUser = "4",
            Type = "Boat",
            Seats = 8,
            Color = "White",
            PictureSrc = "https://fastly.picsum.photos/id/124/200/200.jpg?hmac=FuA4HgovVpaMlT_5gnjY_28jYCrrA2xrYXy3mJ9XDEw",
            BrandModel = "Sunseeker Predator",
            FuelConsumption = "20",
            LicensePlate = "BOAT-2024",
            FuelType = "Diesel",
            HasAC = true,
            HasLed = true,
            HasVehicleInspection = true,
            HasAutomatic = true,
            HasSkiBag = false,
            HasLeather = true,
            HasSeatHeating = true,
            HasCruiseControl = true,
            HasBikeRack = false,
            HasHandLuggageSpace = true,
            HasMountingOnRoof = false,
            HasAnimalSpace = true,
            HasSuitcaseSpace = true,
            HasSkiSpace = false,
            HasPlantSpace = true,
            HasOtherSpace = true,
        };
        
        return [vehicle1, vehicle2, vehicle3, vehicle4];
    }
    
    #endregion
}