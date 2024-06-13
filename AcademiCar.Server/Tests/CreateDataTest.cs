using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Tests.BaseClasses;
using NUnit.Framework;

namespace AcademiCar.Server.Tests;

[TestFixture]
[Order(1)]
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

    [Test (ExpectedResult = true)]
    [Order(1)]
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
            /* TODO - Favorites need to be be set on the actual user, or this results in error
            FavoriteUser? existingTestFavUser = await _unitOfWork.FavoriteUsers.FindByIdAsync(-999);
            if (existingTestFavUser != null) return true;
            
            foreach (FavoriteUser favoriteUser in _GetFavoriteUsers())
                await _unitOfWork.FavoriteUsers.InsertAsync(favoriteUser);
            */

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"FavoriteUser creation failed: {e}");
            return false;
        }
    }

    [Test (ExpectedResult = true)]
    [Order(2)]
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

    [TestCase(ExpectedResult = true)]
    [Order(3)]
    public async Task<bool> CreateTestAddressAndTrip()
    {
        try
        {
            Address? existingTestAddress = await _unitOfWork.Addresses.FindByIdAsync(-999);
            if (existingTestAddress != null) return true;
            
            User? passenger1 = await _unitOfWork.Users.FindByIdAsync("-998");
            User? passenger2 = await _unitOfWork.Users.FindByIdAsync("-997");
            
            foreach (Address address in _GetAddresses())
                await _unitOfWork.Addresses.InsertAsync(address);
            
            foreach (Trip trip in _GetTrips(passenger1, passenger2))
                await _unitOfWork.Trips.InsertAsync(trip);

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Address and Trip creation failed: {e}");
            return false;
        }
    }

    [Test (ExpectedResult = true)]
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
            
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Preferences creation failed: {e}");
            return false;
        }
    }


    #region Data

    private static Carlos[] _GetCarlos()
    {
        Carlos testCarlos1 = new()
        {
            ID = -999,
            Message = "RIP Carlos",
            Image = []
        };

        Carlos testCarlos2 = new()
        {
            ID = -998,
            Message = "Car-los",
            Image = []
        };

        Carlos testCarlos3 = new()
        {
            ID = -997,
            Message = "Carlos ist los",
            Image = []
        };

        Carlos testCarlos4 = new()
        {
            ID = -996,
            Message = "Was ist mit dem Carlos?",
            Image = []
        };

        return [testCarlos1, testCarlos2, testCarlos3, testCarlos4];
    }
    private static Stats[] _GetStats()
    {
        Stats testStatsAdmin = new()
        {
            ID = -999,
            NrTrips = 1,
            CO2Savings = 0.0f,
            DriverRating = 0,
            PassengerRating = 0.0f
        };

        Stats testStatsPassenger1 = new()
        {
            ID = -998,
            NrTrips = 2,
            CO2Savings = 4.2f,
            DriverRating = 0,
            PassengerRating = 3.5f
        };

        Stats testStatsPassenger2 = new()
        {
            ID = -997,
            NrTrips = 2,
            CO2Savings = 6.9f,
            DriverRating = 0,
            PassengerRating = 5f
        };

        Stats testStatsDriver = new()
        {
            ID = -996,
            NrTrips = 3,
            CO2Savings = 42.0f,
            DriverRating = 2,
            PassengerRating = 2.0f
        };

        return [testStatsAdmin, testStatsPassenger1, testStatsPassenger2, testStatsDriver];
    }
    private static User[] _GetUsers()
    {
        User testUserAdmin = new()
        {
            Id = "-999",
            FirstName = "Admin",
            LastName = "Test",
            Picture = [],
            Email = "admin.test@academi.car",
            FK_Stats = -999
        };

        User testUserPassenger1 = new()
        {
            Id = "-998",
            FirstName = "Passenger1",
            LastName = "Test",
            Picture = [],
            Email = "passenger1.test@academi.car",
            FK_Stats = -998
        };

        User testUserPassenger2 = new()
        {
            Id = "-997",
            FirstName = "Passenger2",
            LastName = "Test",
            Picture = [],
            Email = "passenger2.test@academi.car",
            FK_Stats = -997
        };

        User testUserDriver = new()
        {
            Id = "-996",
            FirstName = "Driver",
            LastName = "Test",
            Picture = [],
            Email = "driver.test@academi.car",
            FK_Stats = -996
        };

        return [testUserAdmin, testUserPassenger1, testUserPassenger2, testUserDriver];
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
    private static Vehicle[] _GetVehicles()
    {
        Vehicle testVehicleAdmin = new()
        {
            ID = -999,
            Type = "Admin",
            Seats = 4,
            Color = "Yellow",
            Picture = [],
            Features = "Admin console",
            IsElectric = true,
            FK_User = "-999"
        };
        
        Vehicle testVehicleDriver = new()
        {
            ID = -998,
            Type = "Mitsubishi",
            Seats = 5,
            Color = "Red",
            Picture = [],
            Features = "Mitsubishi ;)",
            IsElectric = false,
            FK_User = "-996"
        };
        
        Vehicle testVehiclePassenger2 = new()
        {
            ID = -997,
            Type = "Vespa",
            Seats = 2,
            Color = "Silver",
            Picture = [],
            Features = "Compact",
            IsElectric = false,
            FK_User = "-997"
        };

        return [testVehicleAdmin, testVehicleDriver, testVehiclePassenger2];
    }
    private static Address[] _GetAddresses()
    {
        Address testAddressAdmin = new()
        {
            ID = -999,
            Street = "Admin Street",
            Number = 1,
            ZIP = 1111,
            Place = "Admin Place",
            Longitude = "0°",
            Latitude = "0°"
        };
        
        Address testAddressPassenger1 = new()
        {
            ID = -998,
            Street = "Alte Poststraße",
            Number = 149,
            ZIP = 8020,
            Place = "Graz",
            Longitude = "47.0691°",
            Latitude = "15.4099°"
        };
        
        Address testAddressPassenger2 = new()
        {
            ID = -997,
            Street = "Ostbahnstraße",
            Number = 3,
            ZIP = 8041,
            Place = "Graz",
            Longitude = "47.0408°",
            Latitude = "15.4630°"
        };
        
        Address testAddressDriver = new()
        {
            ID = -996,
            Street = "Friedrich-Schmidt-Platz",
            Number = 1,
            ZIP = 1010,
            Place = "Wien",
            Longitude = "48.2109°",
            Latitude = "16.3565°"
        };

        return [testAddressAdmin, testAddressPassenger1, testAddressPassenger2, testAddressDriver];
    }
    private static Trip[] _GetTrips(User? passenger1, User? passenger2)
    {
        Trip testTripAdmin = new()
        {
            ID = -999,
            Title = "AdminTrip",
            FK_Driver = "-999",
            FK_Vehicle = -999,
            Passengers = [],
            FK_StartAddress = -999,
            FK_EndAddress = -998,
            StartTime = DateTime.UtcNow.AddDays(-1),
            EndTime = DateTime.UtcNow,
            Duration = 0,
            AvailableSeats = 0,
            Price = 0,
            PaymentMethod = "",
            Status = "Done"
        };
        testTripAdmin.Passengers.Add(passenger1);
        
        Trip testTrip1 = new()
        {
            ID = -998,
            Title = "Jako -> FH",
            FK_Driver = "-996",
            FK_Vehicle = -998,
            Passengers = [],
            FK_StartAddress = -997,
            FK_EndAddress = -998,
            StartTime = DateTime.UtcNow.AddDays(-1).AddHours(-1.5),
            EndTime = DateTime.UtcNow.AddDays(-1),
            Duration = 1.5m,
            AvailableSeats = 2,
            Price = 0,
            PaymentMethod = "No cost",
            Status = "Done"
        };
        testTripAdmin.Passengers.Add(passenger2);
        
        Trip testTrip2 = new()
        {
            ID = -997,
            Title = "Jako -> FH",
            FK_Driver = "-996",
            FK_Vehicle = -998,
            Passengers = [],
            FK_StartAddress = -997,
            FK_EndAddress = -998,
            StartTime = DateTime.UtcNow.AddHours(-1.5),
            EndTime = DateTime.UtcNow,
            Duration = 1.5m,
            AvailableSeats = 2,
            Price = 0,
            PaymentMethod = "No cost",
            Status = "Open"
        };
        testTripAdmin.Passengers.Add(passenger2);
        
        Trip testTrip3 = new()
        {
            ID = -996,
            Title = "FH -> Vienna",
            FK_Driver = "-996",
            FK_Vehicle = -998,
            Passengers = [],
            FK_StartAddress = -998,
            FK_EndAddress = -996,
            StartTime = DateTime.UtcNow.AddDays(-2),
            EndTime = DateTime.UtcNow.AddDays(-2).AddHours(6),
            Duration = 6.0m,
            AvailableSeats = 2,
            Price = 20.0m,
            PaymentMethod = "Cash",
            Status = "Done"
        };
        testTripAdmin.Passengers.Add(passenger1);
        
        return [testTripAdmin, testTrip1, testTrip2, testTrip3];
    }
    private static TripRequest[] _GetTripRequests()
    {
        TripRequest testTripRequestAdmin = new()
        {
            ID = -999,
            FK_Trip = -999,
            FK_PotentialPassenger = "-998",
            Comment = "Test",
            Status = "Accepted"
        };
        
        TripRequest testTripRequest1 = new()
        {
            ID = -998,
            FK_Trip = -998,
            FK_PotentialPassenger = "-997",
            Comment = "Hey...",
            Status = "Accepted"
        };
        
        TripRequest testTripRequest2 = new()
        {
            ID = -997,
            FK_Trip = -997,
            FK_PotentialPassenger = "-997",
            Comment = "Hey again....",
            Status = "Open"
        };
        
        TripRequest testTripRequest3 = new()
        {
            ID = -996,
            FK_Trip = -996,
            FK_PotentialPassenger = "-998",
            Comment = "Hello!",
            Status = "Accepted"
        };

        return [testTripRequestAdmin, testTripRequest1, testTripRequest2, testTripRequest3];
    }
    private static Rating[] _GetRatings()
    {
        Rating testRatingAdmin = new()
        {
            ID = -999,
            FK_User = "-999",
            IsDriver = true,
            IsPassenger = false,
            Score = 0
        };
        
        Rating testRating1 = new()
        {
            ID = -998,
            FK_User = "-998",
            IsDriver = false,
            IsPassenger = true,
            Score = 0
        };
        
        Rating testRating2 = new()
        {
            ID = -997,
            FK_User = "-998",
            IsDriver = false,
            IsPassenger = true,
            Score = 5
        };
        
        Rating testRating3 = new()
        {
            ID = -996,
            FK_User = "-997",
            IsDriver = false,
            IsPassenger = true,
            Score = 5
        };
        
        Rating testRating4 = new()
        {
            ID = -995,
            FK_User = "-996",
            IsDriver = true,
            IsPassenger = false,
            Score = 3
        };

        return [testRatingAdmin, testRating1, testRating2, testRating3, testRating4];
    }
    private static Preferences[] _GetPreferences()
    {
        Preferences testPrefAdmin = new()
        {
            ID = -999,
            FK_User = "-999"
        };
        
        Preferences testPrefPassenger1 = new()
        {
            ID = -998,
            FK_User = "-998"
        };
        
        Preferences testPrefPassenger2 = new()
        {
            ID = -997,
            FK_User = "-997"
        };
        
        Preferences testPrefDriver = new()
        {
            ID = -996,
            FK_User = "-996"
        };

        return [testPrefAdmin, testPrefPassenger1, testPrefPassenger2, testPrefDriver];
    }
    
    #endregion
}