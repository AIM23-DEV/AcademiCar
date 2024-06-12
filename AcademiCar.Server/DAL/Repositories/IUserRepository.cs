using System.Linq.Expressions;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.Repositories
{
    public interface IUserRepository
    {
        IEnumerable<User> FilterBy(
            Expression<Func<User, bool>> filterExpression);

        Task<User?> FindAsync(Expression<Func<User, bool>> filterExpression);
        Task<User?> FindByIdAsync(string id);
        Task InsertAsync(User entity);
        Task UpdateAsync(User entity);
        Task DeleteAsync(Expression<Func<User, bool>> filterExpression);
        Task DeleteByIdAsync(string id);
    }
}
