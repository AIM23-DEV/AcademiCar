﻿using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Tests.BaseClasses;
using NUnit.Framework;

namespace AcademiCar.Server.Tests.DAL;

public class PostgresRepositoryTest : BaseUnitTest
{
    [Test (ExpectedResult = true)]
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

    [Test (ExpectedResult = true)]
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

    [Test (ExpectedResult = true)]
    public async Task<bool> TestCRUD()
    {
        try
        {
            int initialVehicleCount = _GetCurrentVehicleCount();

            await _unitOfWork.Vehicles.InsertAsync(new Vehicle()
            {
                ID = -899,
                FK_OwnerUser = "-999",
                Type = "InsertTestType",
                Seats = 4,
                Color = "Yellow",
                PictureSrc = "/src/assets/c1.jpg",
                BrandModel = "Admin",
                FuelConsumption = "3",
                LicensePlate = "GU - 123 FH",
                FuelType = "Admin",
                HasAC = false,
                HasLed = false,
                HasVehicleInspection = false,
                HasAutomatic = true,
                HasSkiBag = false,
                HasLeather = false,
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
            });
            await _unitOfWork.Vehicles.InsertAsync(new Vehicle()
            {
                Type = "DeleteTestType",
                FK_OwnerUser = "-999",
                ID = -898,
                Seats = 4,
                Color = "Yellow",
                PictureSrc = "/src/assets/c1.jpg",
                BrandModel = "Admin",
                FuelConsumption = "3",
                LicensePlate = "GU - 123 FH",
                FuelType = "Admin",
                HasAC = false,
                HasLed = false,
                HasVehicleInspection = false,
                HasAutomatic = true,
                HasSkiBag = false,
                HasLeather = false,
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