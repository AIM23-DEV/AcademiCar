using AcademiCar.Server.DAL.Entities;
using NUnit.Framework;

namespace AcademiCar.Server.Tests.BaseClasses;

public class CreateDataTest : BaseUnitTest
{
    [Test]
    [TestCase (ExpectedResult = true)]
    public async Task<bool> CreateTestUser()
    {
        try
        {
            Stats foundStats = await _unitOfWork.Stats.FindByIdAsync(-999);
            User foundUser = await _unitOfWork.Users.FindByIdAsync("-999");
            
            if (foundStats == null && foundUser == null)
            {
                Stats testStats = new Stats();
                testStats.ID = -999;

                User testUser = new User();
                testUser.Id = "-999";
                testUser.Email = "postgre@repo.test";
                testUser.FirstName = "testFirstName";
                testUser.LastName = "testLastName";
                testUser.FK_Stats = -999;
                
                await _unitOfWork.Stats.InsertAsync(testStats);
                await _unitOfWork.Users.InsertAsync(testUser);
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
}