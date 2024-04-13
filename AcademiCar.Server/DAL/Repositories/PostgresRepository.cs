﻿using AcademiCar.Server.DAL.Entities;
using System.Linq.Expressions;

namespace AcademiCar.Server.DAL.Repositories
{
    public class PostgresRepository<TEntity> : IPostgresRepository<TEntity> where TEntity : Entity
    {
        protected readonly PostgresDbContext db;


        public PostgresRepository(PostgresDbContext dbContext)
        {
            db = dbContext;
        }


        public IEnumerable<TEntity> FilterBy(Expression<Func<TEntity, bool>> filterExpression)
            => db.Set<TEntity>().Where(filterExpression);
        public IEnumerable<TProjected> FilterBy<TProjected>(Expression<Func<TEntity, bool>> filterExpression, Expression<Func<TEntity, TProjected>> projectionExpression)
            => db.Set<TEntity>().Where(filterExpression).Select(projectionExpression);

        public Task<TEntity> FindAsync(Expression<Func<TEntity, bool>> filterExpression)
            => Task.FromResult(FilterBy(filterExpression).First());
        public async Task<TEntity> FindByIdAsync(int id)
            => await FindAsync(e => e.Id == id);

        public async Task InsertAsync(TEntity entity)
        {
            await db.Set<TEntity>().AddAsync(entity);
            await db.SaveChangesAsync();
        }

        public async Task UpdateAsync(TEntity entity)
        {
            db.Set<TEntity>().Update(entity);
            await db.SaveChangesAsync();
        }

        public async Task DeleteAsync(Expression<Func<TEntity, bool>> filterExpression)
        {
            TEntity entityToRemove = await FindAsync(filterExpression);
            if (entityToRemove == null) return;

            db.Set<TEntity>().Remove(entityToRemove);
            await db.SaveChangesAsync();
        }
        public async Task DeleteByIdAsync(int id)
            => await DeleteAsync(e => e.Id == id);
    }
}
