using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Services.ModelState;

namespace AcademiCar.Server.Services.ServiceImpl;

public class UserService
{
    protected IUserRepository repository;
    protected ModelStateDictionary modelStateDictionary;
    protected IModelStateWrapper validationDictionary;

        
    public UserService(IUserRepository repo)
    {
        repository = repo;
        modelStateDictionary = new ModelStateDictionary();
        validationDictionary = new ModelStateWrapper(modelStateDictionary);
    }

        
    public async Task<bool> Validate(User entity)
    {
        if (entity == null)
            validationDictionary.AddError("Empty", "No User was sent.");

        return validationDictionary.IsValid;
    }


    public async Task<ActionResultResponseModel> Create(User entry)
    {
        ActionResultResponseModel model = new();

        try
        {
            bool isValid = await Validate(entry);
            if (!isValid) throw new Exception("Invalid!");

            await repository.InsertAsync(entry);
            model.IsSuccess = true;
        }
        catch (Exception)
        {
            model.IsSuccess = false;
        }

        return model;
    }

    public async Task<ActionResultResponseModel> Update(User entry)
    {
        ActionResultResponseModel model = new();

        try
        {
            bool isValid = await Validate(entry);
            if (!isValid) throw new Exception("Invalid!");

            await repository.UpdateAsync(entry);
            model.IsSuccess = true;
        }
        catch (Exception)
        {
            model.IsSuccess = false;
        }

        return model;
    }

    public async Task<ActionResultResponseModel> Delete(string id)
    {
        ActionResultResponseModel model = new();

        try
        {
            await repository.DeleteByIdAsync(id);
            model.IsSuccess = true;
        }
        catch (Exception)
        {
            model.IsSuccess = false;
        }

        return model;
    }

    public async Task<User?> Get(string id) => await repository.FindByIdAsync(id);
    public async Task<List<User?>> Get()
        => await Task.FromResult<List<User?>>([..repository.FilterBy(e => true)]);

    public async Task SetModelState(ModelStateDictionary validation)
    {
        modelStateDictionary = validation;
        validationDictionary = new ModelStateWrapper(modelStateDictionary);
    }
}