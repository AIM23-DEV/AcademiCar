using Microsoft.EntityFrameworkCore;

namespace AcademiCar.Server.DAL
{
    public class PostgresDbContext : DbContext
    {
        public PostgresDbContext(DbContextOptions<PostgresDbContext> options) : base(options) {}


        #region DB Tables

        // TODO - insert tables here
        // Example:
        //public DbSet<User> Users { get; set; }

        #endregion
    }
}
