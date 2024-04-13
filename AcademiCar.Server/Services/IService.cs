using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.Services.Response;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AcademiCar.Server.Services
{
    public interface IService<TEntity> where TEntity : Entity
    {
        public abstract Task<ActionResultResponseModel> Create(TEntity entry);
        public abstract Task<ActionResultResponseModel> Update(TEntity entry);
        public Task<ActionResultResponseModel> Delete(int id);
        public Task<TEntity> Get(int id);
        public Task<List<TEntity>> Get();
        public Task SetModelState(ModelStateDictionary validation);
    }
}
