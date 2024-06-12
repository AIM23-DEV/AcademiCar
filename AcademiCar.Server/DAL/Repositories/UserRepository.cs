using System.Linq.Expressions;
using AcademiCar.Server.DAL.Entities;
using AcademiCar.Server.DAL.UnitOfWork;

namespace AcademiCar.Server.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        protected readonly PostgresDbContext db;

        
        public UserRepository(PostgresDbContext dbContext)
        {
            db = dbContext;
        }
        
        
        public IEnumerable<User> FilterBy(Expression<Func<User, bool>> filterExpression)
            => db.Set<User>().Where(filterExpression);

        public async Task<User?> FindByIdAsync(string id)
            => await FindAsync(e => e.Id == id);
        public async Task<User?> FindAsync(Expression<Func<User, bool>> filterExpression)
        {
            IEnumerable<User> filtered = FilterBy(filterExpression);
            if (filtered.Any()) return filtered.First();
            return null;
        }

        public async Task InsertAsync(User entity)
        {
            await db.Set<User>().AddAsync(entity);
            await db.SaveChangesAsync();
        }
        
        public async Task UpdateAsync(User entity)
        {
            db.Set<User>().Update(entity);
            await db.SaveChangesAsync();
        }

        public async Task DeleteAsync(Expression<Func<User, bool>> filterExpression)
        {
            User entityToRemove = await FindAsync(filterExpression);
            if (entityToRemove == null) return;

            db.Set<User>().Remove(entityToRemove);
            await db.SaveChangesAsync();
        }
        public async Task DeleteByIdAsync(string id)
            => await DeleteAsync(e => e.Id == id);
    }
}
