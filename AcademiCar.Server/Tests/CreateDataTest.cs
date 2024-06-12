using AcademiCar.Server.DAL.Entities;
using NUnit.Framework;

namespace AcademiCar.Server.Tests.BaseClasses;

public class CreateDataTest : BaseUnitTest
{
    [Test]
    [TestCase (ExpectedResult = true)]
    public async Task<bool> CreateTestStatsAndUser()
    {
        try
        {
            Stats existingTestStats = await _unitOfWork.Stats.FindByIdAsync(-999);
            User existingTestUser = await _unitOfWork.Users.FindByIdAsync("-999");
            
            if (existingTestStats == null && existingTestUser == null)
            {
                Stats newTestStatsAdmin = new Stats();
                newTestStatsAdmin.ID = -999;
                newTestStatsAdmin.NrTrips = 0;
                newTestStatsAdmin.CO2Savings = 0.0f;
                newTestStatsAdmin.DriverRating = 0;
                newTestStatsAdmin.PassengerRating = 0.0f;

                Stats newTestStatsPassenger1 = new Stats();
                newTestStatsPassenger1.ID = -998;
                newTestStatsPassenger1.NrTrips = 10;
                newTestStatsPassenger1.CO2Savings = 4.2f;
                newTestStatsPassenger1.DriverRating = 0;
                newTestStatsPassenger1.PassengerRating = 3.5f;
                
                Stats newTestStatsPassenger2 = new Stats();
                newTestStatsPassenger2.ID = -997;
                newTestStatsPassenger2.NrTrips = 2;
                newTestStatsPassenger2.CO2Savings = 6.9f;
                newTestStatsPassenger2.DriverRating = 0;
                newTestStatsPassenger2.PassengerRating = 5f;

                Stats newTestStatsDriver = new Stats();
                newTestStatsDriver.ID = -996;
                newTestStatsDriver.NrTrips = 3;
                newTestStatsDriver.CO2Savings = 42.0f;
                newTestStatsDriver.DriverRating = 2;
                newTestStatsDriver.PassengerRating = 2.0f;
                
                User newTestUserAdmin = new User();
                newTestUserAdmin.Id = "-999";
                newTestUserAdmin.Email = "admin.test@academi.car";
                newTestUserAdmin.FirstName = "Admin";
                newTestUserAdmin.LastName = "Test";
                newTestUserAdmin.FK_Stats = -999;
                
                User newTestUserPassenger1 = new User();
                newTestUserPassenger1.Id = "-998";
                newTestUserPassenger1.Email = "passenger1.test@academi.car";
                newTestUserPassenger1.FirstName = "Passenger1";
                newTestUserPassenger1.LastName = "Test";
                newTestUserPassenger1.FK_Stats = -998;
                
                User newTestUserPassenger2 = new User();
                newTestUserPassenger2.Id = "-997";
                newTestUserPassenger2.Email = "passenger2.test@academi.car";
                newTestUserPassenger2.FirstName = "Passenger2";
                newTestUserPassenger2.LastName = "Test";
                newTestUserPassenger2.FK_Stats = -997;
                
                User newTestUserDriver = new User();
                newTestUserDriver.Id = "-996";
                newTestUserDriver.Email = "driver.test@academi.car";
                newTestUserDriver.FirstName = "Driver";
                newTestUserDriver.LastName = "Test";
                newTestUserDriver.FK_Stats = -996;
                
                
                await _unitOfWork.Stats.InsertAsync(newTestStatsAdmin);
                await _unitOfWork.Stats.InsertAsync(newTestStatsPassenger1);
                await _unitOfWork.Stats.InsertAsync(newTestStatsPassenger2);
                await _unitOfWork.Stats.InsertAsync(newTestStatsDriver);
                
                await _unitOfWork.Users.InsertAsync(newTestUserAdmin);
                await _unitOfWork.Users.InsertAsync(newTestUserPassenger1);
                await _unitOfWork.Users.InsertAsync(newTestUserPassenger2);
                await _unitOfWork.Users.InsertAsync(newTestUserDriver);
            }

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"User creation failed: {e}");
            return false;
        }
    }
    
    [Test]
    [TestCase (ExpectedResult = true)]
    public async Task<bool> CreateTestVehicle()
    {
        try
        {
            Vehicle? foundVehicle = await _unitOfWork.Vehicles.FindByIdAsync(-999);
            if (foundVehicle == null)
            {
                Vehicle testVehicle = new Vehicle();
                testVehicle.ID = -999;
                testVehicle.Type = "TestType";
                testVehicle.Color = "Yellow";
                testVehicle.Picture = new byte[] {};
                testVehicle.Features = "TestFeature";
                testVehicle.FK_User = "-999";
                
                await _unitOfWork.Vehicles.InsertAsync(testVehicle);
            }

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Vehicle creation failed: {e}");
            return false;
        }
    }

    [Test]
    [TestCase(ExpectedResult = true)]
    public async Task<bool> CreateTestTrip()
    {
        try
        {
            Trip? testTrip = await _unitOfWork.Trips.FindByIdAsync(-999);
            if (testTrip == null)
            {
                Vehicle testVehicle = new Vehicle();
                testVehicle.ID = -999;
                testVehicle.Type = "TestType";
                testVehicle.Color = "Yellow";
                testVehicle.Picture = new byte[] {};
                testVehicle.Features = "TestFeature";
                testVehicle.FK_User = "-999";
                
                await _unitOfWork.Vehicles.InsertAsync(testVehicle);
            }

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Vehicle creation failed: {e}");
            return false;
        }
    }
}