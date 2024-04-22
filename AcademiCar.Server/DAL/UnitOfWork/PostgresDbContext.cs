using AcademiCar.Server.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace AcademiCar.Server.DAL.UnitOfWork
{
    public class PostgresDbContext : DbContext
    {
        public PostgresDbContext(DbContextOptions<PostgresDbContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestTable>().ToTable("Test_table", schema: "test_schema");
        }


        #region DB Tables

        // TODO - insert tables here
        // Example:
        public DbSet<TestTable> TestTableEntries { get; set; }
        //public DbSet<User> Users { get; set; }

        #endregion
    }
}
