using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Tests.BaseClasses;
using NUnit.Framework;

namespace AcademiCar.Server.Tests;

[TestFixture, Order(1)]
public class CreateDataTest : BaseUnitTest
{
    [Test (ExpectedResult = true)]
    public async Task<bool> CreateTestCarlos()
    {
        try
        {
            Carlos? existingTestCarlos = await _unitOfWork.Carlos.FindByIdAsync(-999);
            if (existingTestCarlos != null) return true;
            
            foreach (Carlos carlos in _GetCarlos())
                await _unitOfWork.Carlos.InsertAsync(carlos);

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Carlos creation failed: {e}");
            return false;
        }
    }

    [TestCase(ExpectedResult = true), Order(1)]
    public async Task<bool> CreateTestAddress()
    {
        try
        {
            Address? existingTestAddress = await _unitOfWork.Addresses.FindByIdAsync(-999);
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
            Stats? existingTestStats = await _unitOfWork.Stats.FindByIdAsync(-999);
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

    [Test (ExpectedResult = true)]
    public async Task<bool> CreateTestFavUser()
    {
        try
        {
            FavoriteUser? existingTestFavUser = await _unitOfWork.FavoriteUsers.FindByIdAsync(-999);
            if (existingTestFavUser != null) return true;
            
            foreach (FavoriteUser favoriteUser in _GetFavoriteUsers())
                await _unitOfWork.FavoriteUsers.InsertAsync(favoriteUser);

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"FavoriteUser creation failed: {e}");
            return false;
        }
    }

    [Test (ExpectedResult = true), Order(3)]
    public async Task<bool> CreateTestVehicle()
    {
        try
        {
            Vehicle? existingTestVehicle = await _unitOfWork.Vehicles.FindByIdAsync(-999);
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
            Trip? existingTestTrip = await _unitOfWork.Trips.FindByIdAsync(-999);
            if (existingTestTrip != null) return true;
            
            foreach (Trip trip in _GetTrips())
                await _unitOfWork.Trips.InsertAsync(trip);

            foreach (TripPassenger tripPassenger in _GetTripPassengers())
                await _unitOfWork.TripPassengers.InsertAsync(tripPassenger);
            
            foreach (TripStop tripStop in _GetTripStops())
                await _unitOfWork.TripStops.InsertAsync(tripStop);
            
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
            TripRequest? existingTripRequest = await _unitOfWork.TripRequests.FindByIdAsync(-999);
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
            Rating? existingRating = await _unitOfWork.Ratings.FindByIdAsync(-999);
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
            Preferences? existingPreferences = await _unitOfWork.Preferences.FindByIdAsync(-999);
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
            PersonalChat? existingChat = await _unitOfWork.PersonalChats.FindByIdAsync(-999);
            if (existingChat != null) return true;
            
            foreach (PersonalChat chat in _getPersonalChats())
                await _unitOfWork.PersonalChats.InsertAsync(chat);
            
            foreach (PersonalMessage message in _getPersonalMessages())
                await _unitOfWork.PersonalMessages.InsertAsync(message);
            
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
            GroupChat? existingChat = await _unitOfWork.GroupChats.FindByIdAsync(-999);
            if (existingChat != null) return true;
            
            foreach (GroupChat chat in _getGroupChats())
                await _unitOfWork.GroupChats.InsertAsync(chat);

            foreach (GroupChatUser chatUser in _getGroupChatUsers())
                await _unitOfWork.GroupChatUsers.InsertAsync(chatUser);
            
            foreach (GroupMessage message in _getGroupMessages())
                await _unitOfWork.GroupMessages.InsertAsync(message);
            
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
        Address testAddress1 = new()
        {
            ID = -999,
            Street = "Admin Street",
            Number = 1,
            ZIP = 1111,
            Place = "Admin Place",
            Longitude = "0°",
            Latitude = "0°"
        };
        
        Address testAddress2 = new()
        {
            ID = -998,
            Street = "Alte Poststraße",
            Number = 149,
            ZIP = 8020,
            Place = "Graz",
            Longitude = "47.0691°",
            Latitude = "15.4099°"
        };
        
        Address testAddress3 = new()
        {
            ID = -997,
            Street = "Ostbahnstraße",
            Number = 3,
            ZIP = 8041,
            Place = "Graz",
            Longitude = "47.0408°",
            Latitude = "15.4630°"
        };
        
        Address testAddress4 = new()
        {
            ID = -996,
            Street = "Friedrich-Schmidt-Platz",
            Number = 1,
            ZIP = 1010,
            Place = "Wien",
            Longitude = "48.2109°",
            Latitude = "16.3565°"
        };

        return [testAddress1, testAddress2, testAddress3, testAddress4];
    }
    private static Carlos[] _GetCarlos()
    {
        Carlos testCarlos1 = new()
        {
            ID = -999,
            Message = "RIP Carlos",
            ImageSrc = "/src/assets/c1.jpg"
        };

        Carlos testCarlos2 = new()
        {
            ID = -998,
            Message = "Carlos-los",
            ImageSrc = "/src/assets/c2.jpg"
        };

        Carlos testCarlos3 = new()
        {
            ID = -997,
            Message = "Carlos ist los",
            ImageSrc = "/src/assets/c3.jpg"
        };

        Carlos testCarlos4 = new()
        {
            ID = -996,
            Message = "Carlos?",
            ImageSrc = "/src/assets/c4.jpg"
        };
        
        Carlos testCarlos5 = new()
        {
            ID = -995,
            Message = "Was ist mit dem Carlos?",
            ImageSrc = "/src/assets/c5.jpg"
        };

        return [testCarlos1, testCarlos2, testCarlos3, testCarlos4, testCarlos5];
    }
    private static PersonalChat[] _getPersonalChats()
    {
        PersonalChat testChat1 = new()
        {
            ID = -999,
            FK_Trip = -999,
            FK_PassengerUser = "-999",
            FK_DriverUser = "-998",
            UpdatedAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-24)
        };
        
        PersonalChat testChat2 = new()
        {
            ID = -998,
            FK_Trip = -998,
            FK_PassengerUser = "-998",
            FK_DriverUser = "-997",
            UpdatedAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-24)
        };

        return [testChat1, testChat2];
    }
    private static GroupChat[] _getGroupChats()
    {
        GroupChat testChat1 = new()
        {
            ID = -999,
            FK_Trip = -999,
            UpdatedAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-24)
        };
        
        GroupChat testChat2 = new()
        {
            ID = -998,
            FK_Trip = -998,
            UpdatedAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-24)
        };

        return [testChat1, testChat2];
    }
    private static FavoriteUser[] _GetFavoriteUsers()
    {
        FavoriteUser testFavUserEntry1 = new()
        {
            ID = -999,
            FK_UserId = "-999",
            FK_FavUserId = "-998",
        };
        
        FavoriteUser testFavUserEntry2 = new()
        {
            ID = -998,
            FK_UserId = "-999",
            FK_FavUserId = "-997"
        };
        
        FavoriteUser testFavUserEntry3 = new()
        {
            ID = -997,
            FK_UserId = "-999",
            FK_FavUserId = "-996"
        };
        
        FavoriteUser testFavUserEntry4 = new()
        {
            ID = -996,
            FK_UserId = "-996",
            FK_FavUserId = "-997"
        };

        return [testFavUserEntry1, testFavUserEntry2, testFavUserEntry3, testFavUserEntry4];
    }
    private static InterestPreference[] _GetInterestPreferences()
    {
        InterestPreference testInterestPreference1 = new()
        {
            ID = -999,
            FK_Preferences = -999,
            Interest = "Reisen",
        };
        
        InterestPreference testInterestPreference2 = new()
        {
            ID = -998,
            FK_Preferences = -999,
            Interest = "Technik"
        };
        
        InterestPreference testInterestPreference3 = new()
        {
            ID = -997,
            FK_Preferences = -998,
            Interest = "Singen"
        };
        
        InterestPreference testInterestPreference4 = new()
        {
            ID = -996,
            FK_Preferences = -997,
            Interest = "Kochen"
        };

        return [testInterestPreference1, testInterestPreference2, testInterestPreference3, testInterestPreference4];
    }
    private static GroupMessage[] _getGroupMessages()
    {
        GroupMessage testMessage1 = new()
        {
            ID = -999,
            FK_SenderUser = "-999",
            FK_GroupChat = -999,
            Content = "Test Admin",
            SentAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-24),
        };
        
        GroupMessage testMessage2 = new()
        {
            ID = -998,
            FK_SenderUser = "-998",
            FK_GroupChat = -998,
            Content = "Test Eins",
            SentAt = DateTime.UtcNow.AddHours(-1).AddMinutes(-43),
        };

        return [testMessage1, testMessage2];
    }
    
    private static GroupChatUser[] _getGroupChatUsers()
    {
        GroupChatUser testChatUser1 = new()
        {
            ID = -999,
            FK_GroupChat = -999,
            FK_User = "-999"
        };
        
        GroupChatUser testChatUser2 = new()
        {
            ID = -998,
            FK_GroupChat = -998,
            FK_User = "-998"
        };

        return [testChatUser1, testChatUser2];
    }
    
    private static PersonalMessage[] _getPersonalMessages()
    {
        PersonalMessage testMessage1 = new()
        {
            ID = -999,
            FK_SenderUser = "-999",
            FK_PersonalChat = -999,
            Content = "Test Admin",
            SentAt = DateTime.UtcNow.AddHours(-2).AddMinutes(-24),
        };
        
        PersonalMessage testMessage2 = new()
        {
            ID = -998,
            FK_SenderUser = "-998",
            FK_PersonalChat = -998,
            Content = "Test Eins",
            SentAt = DateTime.UtcNow.AddHours(-1).AddMinutes(-43),
        };

        return [testMessage1, testMessage2];
    }
    private static MusicPreference[] _GetMusicPreferences()
    {
        MusicPreference testMusicPreference1 = new()
        {
            ID = -999,
            FK_Preferences = -999,
            Genre = "Pop",
        };
        
        MusicPreference testMusicPreference2 = new()
        {
            ID = -998,
            FK_Preferences = -999,
            Genre = "Rock"
        };
        
        MusicPreference testMusicPreference3 = new()
        {
            ID = -997,
            FK_Preferences = -998,
            Genre = "Podcasts"
        };
        
        MusicPreference testMusicPreference4 = new()
        {
            ID = -996,
            FK_Preferences = -997,
            Genre = "Schlager"
        };

        return [testMusicPreference1, testMusicPreference2, testMusicPreference3, testMusicPreference4];
    }
    private static Preferences[] _GetPreferences()
    {
        Preferences testPreferences1 = new()
        {
            ID = -999,
            FK_User = "-999"
        };
        
        Preferences testPreferences2 = new()
        {
            ID = -998,
            FK_User = "-998"
        };
        
        Preferences testPreferences3 = new()
        {
            ID = -997,
            FK_User = "-997"
        };
        
        Preferences testPreferences4 = new()
        {
            ID = -996,
            FK_User = "-996"
        };

        return [testPreferences1, testPreferences2, testPreferences3, testPreferences4];
    }
    private static Rating[] _GetRatings()
    {
        Rating testRating1 = new()
        {
            ID = -999,
            FK_RatingUser = "-999",
            FK_RatedUser = "-998",
            IsDriver = true,
            IsPassenger = false,
            Score = 0,
            Comment = "Meh"
        };
        
        Rating testRating2 = new()
        {
            ID = -998,
            FK_RatingUser = "-998",
            FK_RatedUser = "-999",
            IsDriver = false,
            IsPassenger = true,
            Score = 0,
            Comment = "Hat nicht bezahlt"
        };
        
        Rating testRating3 = new()
        {
            ID = -997,
            FK_RatingUser = "-998",
            FK_RatedUser = "-997",
            IsDriver = false,
            IsPassenger = true,
            Score = 5,
            Comment = ""
        };
        
        Rating testRating4 = new()
        {
            ID = -996,
            FK_RatingUser = "-997",
            FK_RatedUser = "-999",
            IsDriver = false,
            IsPassenger = true,
            Score = 5,
            Comment = "Perfekt!"
        };
        
        Rating testRating5 = new()
        {
            ID = -995,
            FK_RatingUser = "-996",
            FK_RatedUser = "-997",
            IsDriver = true,
            IsPassenger = false,
            Score = 3,
            Comment = ""
        };

        return [testRating1, testRating2, testRating3, testRating4, testRating5];
    }
    private static Stats[] _GetStats()
    {
        Stats testStats1 = new()
        {
            ID = -999,
            DriverKilometres = 10,
            PassengerKilometres = 4,
            NrTrips = 1,
            CO2Savings = 10.0f,
        };

        Stats testStats2 = new()
        {
            ID = -998,
            DriverKilometres = 2,
            PassengerKilometres = 4,
            NrTrips = 2,
            CO2Savings = 4.2f,
        };

        Stats testStats3 = new()
        {
            ID = -997,
            DriverKilometres = 0,
            PassengerKilometres = 4,
            NrTrips = 2,
            CO2Savings = 6.9f,
        };

        Stats testStats4 = new()
        {
            ID = -996,
            DriverKilometres = 30,
            PassengerKilometres = 4,
            NrTrips = 3,
            CO2Savings = 42.0f,
        };

        return [testStats1, testStats2, testStats3, testStats4];
    }
    private static TravelPreference[] _GetTravelPreferences()
    {
        TravelPreference testTravelPreference1 = new()
        {
            ID = -999,
            FK_Preferences = -999,
            PreferenceText = "Kein Rauchen",
            IconType = "No",
        };
        
        TravelPreference testTravelPreference2 = new()
        {
            ID = -998,
            FK_Preferences = -999,
            PreferenceText = "Gesprächig",
            IconType = "Talk",
        };
        
        TravelPreference testTravelPreference3 = new()
        {
            ID = -997,
            FK_Preferences = -998,
            PreferenceText = "Gesprächig",
            IconType = "Talk",
        };
        
        TravelPreference testTravelPreference4 = new()
        {
            ID = -996,
            FK_Preferences = -997,
            PreferenceText = "Gesprächig",
            IconType = "Talk",
        };

        return [testTravelPreference1, testTravelPreference2, testTravelPreference3, testTravelPreference4];
    }
    private static Trip[] _GetTrips()
    {
        Trip testTrip1 = new()
        {
            ID = -999,
            Title = "AdminTrip",
            FK_Driver = "-999",
            FK_Vehicle = -999,
            FK_StartAddress = -999,
            FK_EndAddress = -998,
            StartTime = DateTime.UtcNow.AddDays(-1),
            EndTime = DateTime.UtcNow,
            AvailableSeats = 0,
            Price = 0,
            PaymentMethod = "",
            Status = "Done"
        };
        
        Trip testTrip2 = new()
        {
            ID = -998,
            Title = "Jako -> FH",
            FK_Driver = "-996",
            FK_Vehicle = -998,
            FK_StartAddress = -997,
            FK_EndAddress = -998,
            StartTime = DateTime.UtcNow.AddDays(-1).AddHours(-1.5),
            EndTime = DateTime.UtcNow.AddDays(-1),
            AvailableSeats = 2,
            Price = 0,
            PaymentMethod = "No cost",
            Status = "Done"
        };
        
        Trip testTrip3 = new()
        {
            ID = -997,
            Title = "Jako -> FH",
            FK_Driver = "-996",
            FK_Vehicle = -998,
            FK_StartAddress = -997,
            FK_EndAddress = -998,
            StartTime = DateTime.UtcNow.AddHours(-1.5),
            EndTime = DateTime.UtcNow,
            AvailableSeats = 2,
            Price = 0,
            PaymentMethod = "No cost",
            Status = "Open"
        };
        
        Trip testTrip4 = new()
        {
            ID = -996,
            Title = "FH -> Vienna",
            FK_Driver = "-996",
            FK_Vehicle = -998,
            FK_StartAddress = -998,
            FK_EndAddress = -996,
            StartTime = DateTime.UtcNow.AddDays(-2),
            EndTime = DateTime.UtcNow.AddDays(-2).AddHours(6),
            AvailableSeats = 2,
            Price = 20.0f,
            PaymentMethod = "Cash",
            Status = "Done"
        };
        
        return [testTrip1, testTrip2, testTrip3, testTrip4];
    }
    private static TripPassenger[] _GetTripPassengers()
    {
        TripPassenger testTripPassenger1 = new()
        {
            ID = -999,
            FK_Trip = -999,
            FK_PassengerUser = "-998"
        };

        TripPassenger testTripPassenger2 = new()
        {
            ID = -998,
            FK_Trip = -998,
            FK_PassengerUser = "-999"
        };

        TripPassenger testTripPassenger3 = new()
        {
            ID = -997,
            FK_Trip = -998,
            FK_PassengerUser = "-997"
        };

        TripPassenger testTripPassenger4 = new()
        {
            ID = -996,
            FK_Trip = -996,
            FK_PassengerUser = "-998"
        };

        return [testTripPassenger1, testTripPassenger2, testTripPassenger3, testTripPassenger4];
    }
    private static TripRequest[] _GetTripRequests()
    {
        TripRequest testTripRequest1 = new()
        {
            ID = -999,
            FK_Trip = -999,
            FK_PotentialPassenger = "-998",
            Comment = "Test",
            Status = "Accepted"
        };
        
        TripRequest testTripRequest2 = new()
        {
            ID = -998,
            FK_Trip = -998,
            FK_PotentialPassenger = "-997",
            Comment = "Hey...",
            Status = "Accepted"
        };
        
        TripRequest testTripRequest3 = new()
        {
            ID = -997,
            FK_Trip = -997,
            FK_PotentialPassenger = "-997",
            Comment = "Hey again....",
            Status = "Open"
        };
        
        TripRequest testTripRequest4 = new()
        {
            ID = -996,
            FK_Trip = -996,
            FK_PotentialPassenger = "-998",
            Comment = "Hello!",
            Status = "Accepted"
        };

        return [testTripRequest1, testTripRequest2, testTripRequest3, testTripRequest4];
    }
    private static TripStop[] _GetTripStops()
    {
        TripStop testTripStop1 = new()
        {
            ID = -999,
            FK_Trip = -999,
            FK_StopAddress = -997,
            StopDurationInMinutes = 10
        };
        
        TripStop testTripStop2 = new()
        {
            ID = -998,
            FK_Trip = -998,
            FK_StopAddress = -997,
            StopDurationInMinutes = 5
        };
        
        TripStop testTripStop3 = new()
        {
            ID = -997,
            FK_Trip = -997,
            FK_StopAddress = -997,
            StopDurationInMinutes = 5
        };
        
        TripStop testTripStop4 = new()
        {
            ID = -996,
            FK_Trip = -996,
            FK_StopAddress = -997,
            StopDurationInMinutes = 15
        };

        return [testTripStop1, testTripStop2, testTripStop3, testTripStop4];
    }
    private static User[] _GetUsers()
    {
        User testUser1 = new()
        {
            Id = "-999",
            FirstName = "Admin",
            LastName = "Test",
            PictureSrc = "/src/assets/krucziii.jpg",
            Email = "admin.test@academi.car",
            FK_Stats = -999,
            FK_Address = -999,
            PhoneNumber = "0650 123 12 12"
        };

        User testUser2 = new()
        {
            Id = "-998",
            FirstName = "Academi",
            LastName = "Car",
            PictureSrc = "/src/assets/c1.jpg",
            Email = "academi.car@academi.car",
            FK_Stats = -998,
            FK_Address = -999,
            PhoneNumber = "0664 123 34 56"
        };

        User testUser3 = new()
        {
            Id = "-997",
            FirstName = "Car",
            LastName = "Los",
            PictureSrc = "/src/assets/c5.jpg",
            Email = "car.los@academi.car",
            FK_Stats = -997,
            FK_Address = -996,
            PhoneNumber = "0600 321 21 21"
        };

        User testUser4 = new()
        {
            Id = "-996",
            FirstName = "Driver",
            LastName = "Test",
            PictureSrc = "/src/assets/women_mock.jpg",
            Email = "driver.test@academi.car",
            FK_Stats = -996,
            FK_Address = -999,
            PhoneNumber = "1234 123 12 12"
        };

        return [testUser1, testUser2, testUser3, testUser4];
    }
    private static Vehicle[] _GetVehicles()
    {
        Vehicle testVehicleAdmin = new()
        {
            ID = -999,
            Type = "Admin",
            Seats = 4,
            Color = "Yellow",
            PictureSrc = "/src/assets/c1.jpg",
            FK_User = "-999"
        };
        
        Vehicle testVehicleDriver = new()
        {
            ID = -998,
            Type = "Mitsubishi",
            Seats = 5,
            Color = "Red",
            PictureSrc = "/src/assets/c1.jpg",
            FK_User = "-996"
        };
        
        Vehicle testVehiclePassenger2 = new()
        {
            ID = -997,
            Type = "Vespa",
            Seats = 2,
            Color = "Silver",
            PictureSrc = "/src/assets/c1.jpg",
            FK_User = "-997"
        };

        return [testVehicleAdmin, testVehicleDriver, testVehiclePassenger2];
    }
    
    #endregion
}