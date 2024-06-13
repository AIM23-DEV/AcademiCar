using AcademiCar.Server.DAL.BaseInterfaces;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.Repositories;
using AcademiCar.Server.DAL.UnitOfWork;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Services.ModelState;

namespace AcademiCar.Server.Services
{
    public abstract class Service<TEntity> : IService<TEntity> where TEntity : IEntity
    {
        protected IUnitOfWork unitOfWork;
        protected IPostgresRepository<TEntity> repository;
        protected IGlobalService globalService;
        protected IModelStateWrapper validationDictionary;
        protected ModelStateDictionary modelStateDictionary;

        public Service(IUnitOfWork uow, IPostgresRepository<TEntity> repo, IGlobalService globals)
        {
            unitOfWork = uow;
            repository = repo;
            globalService = globals;
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

        public async Task<TEntity> Get(int id) => await repository.FindByIdAsync(id);
        public async Task<List<TEntity>> Get()
            => await Task.FromResult<List<TEntity>>(new(repository.FilterBy(e => true)));

        public async Task SetModelState(ModelStateDictionary validation)
        {
            validationDictionary = new ModelStateWrapper(validation);
            modelStateDictionary = validation;
        }
    }
}
