using System.Linq.Expressions;

namespace AcademiCar.Server.DAL.BaseInterfaces;

public interface IPostgresRepository<TEntity> where TEntity : IEntity
{
    IEnumerable<TEntity> FilterBy(
        Expression<Func<TEntity, bool>> filterExpression);

    Task<TEntity?> FindAsync(Expression<Func<TEntity, bool>> filterExpression);
    Task<TEntity?> FindByIdAsync(int id);
    Task InsertAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(Expression<Func<TEntity, bool>> filterExpression);
    Task DeleteByIdAsync(int id);
}