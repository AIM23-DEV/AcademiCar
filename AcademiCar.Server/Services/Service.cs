using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Services.ModelState;

namespace AcademiCar.Server.Services
{
    public abstract class Service<TEntity> : IService<TEntity> where TEntity : IEntity
    {
        protected IPostgresRepository<TEntity> repository;
        protected ModelStateDictionary modelStateDictionary;
        protected IModelStateWrapper validationDictionary;

        public Service(IPostgresRepository<TEntity> repo)
        {
            repository = repo;
            modelStateDictionary = new ModelStateDictionary();
            validationDictionary = new ModelStateWrapper(modelStateDictionary);
        }


        public abstract Task<bool> Validate(TEntity entity);


        public async Task<ActionResultResponseModel> Create(TEntity entry)
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

        public async Task<ActionResultResponseModel> Update(TEntity entry)
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

        public async Task<ActionResultResponseModel> Delete(int id)
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

        public async Task<TEntity?> Get(int id) => await repository.FindByIdAsync(id);
        public async Task<List<TEntity?>> Get()
            => await Task.FromResult<List<TEntity?>>([..repository.FilterBy(e => true)]);

        public async Task SetModelState(ModelStateDictionary validation)
        {
            modelStateDictionary = validation;
            validationDictionary = new ModelStateWrapper(modelStateDictionary);
        }
    }
}
