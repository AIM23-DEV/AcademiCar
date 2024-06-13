using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Tests.BaseClasses;
using NUnit.Framework;

namespace AcademiCar.Server.Tests.DAL;

public class PostgresRepositoryTest : BaseUnitTest
{
    [Test]
    [TestCase(ExpectedResult = true)]
    public bool TestFilterBy()
    {
        try
        {
            if (!_unitOfWork.Vehicles.FilterBy(v => v.Type == "Admin").Any())
                throw new Exception("FilterBy Error!");

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }

    [Test]
    [TestCase(ExpectedResult = true)]
    public async Task<bool> TestFind()
    {
        try
        {
            Vehicle? testVehicle = await _GetVehicleByType("Admin");
            if (testVehicle?.Type != "Admin")
                throw new Exception("FindAsync Error!");

            Vehicle? compareVehicle = await _unitOfWork.Vehicles.FindByIdAsync(((IEntity)testVehicle).ID);
            if (compareVehicle?.ID != -999)
                throw new Exception("FindById Error!");

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }

    [Test]
    [TestCase(ExpectedResult = true)]
    public async Task<bool> TestCRUD()
    {
        try
        {
            int initialVehicleCount = _GetCurrentVehicleCount();

            await _unitOfWork.Vehicles.InsertAsync(new Vehicle()
            {
                Type = "InsertTestType",
                ID = -899,
                Color = "Yellow",
                Picture = [],
                Features = "TestFeature",
                FK_User = "-999",
            });
            await _unitOfWork.Vehicles.InsertAsync(new Vehicle()
            {
                Type = "DeleteTestType",
                ID = -898,
                Color = "Yellow",
                Picture = [],
                Features = "TestFeature",
                FK_User = "-999",
            });
                
            if (_GetCurrentVehicleCount() != initialVehicleCount + 2)
                throw new Exception("InsertAsync Error!");

            Vehicle? insertedVehicle = await _GetVehicleByType("InsertTestType");
            if (insertedVehicle?.Type != "InsertTestType")
                throw new Exception("FindAsync Error!");

            insertedVehicle.Type = "Update";
            await _unitOfWork.Vehicles.UpdateAsync(insertedVehicle);
            
            Vehicle? updatedVehicle = await _GetVehicleByType("Update");
            if (updatedVehicle != null && ((IEntity)updatedVehicle).ID != ((IEntity)insertedVehicle).ID)
                throw new Exception("UpdateAsync Error!");

            await _unitOfWork.Vehicles.DeleteAsync(v => v.Type == "DeleteTestType");
            if (_GetCurrentVehicleCount() != initialVehicleCount + 1)
                throw new Exception("DeleteAsync Error!");

            await _unitOfWork.Vehicles.DeleteByIdAsync(insertedVehicle.ID);
            if (_GetCurrentVehicleCount() != initialVehicleCount)
                throw new Exception("DeleteById Error!");

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }

    private async Task<Vehicle?> _GetVehicleByType(string type)
        => await _unitOfWork.Vehicles.FindAsync(v => v.Type == type);
    private int _GetCurrentVehicleCount()
        => _unitOfWork.Vehicles.FilterBy(v => true).Count();
}