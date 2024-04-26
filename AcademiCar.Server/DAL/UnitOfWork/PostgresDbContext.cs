using AcademiCar.Server.DAL.Entities;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace AcademiCar.Server.DAL.UnitOfWork
{
    public class PostgresDbContext : DbContext
    {
        public PostgresDbContext(DbContextOptions<PostgresDbContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestTable>().ToTable("Test_table", schema: "test_schema");
            modelBuilder.Entity<Stats>().ToTable("Stats", schema: "academicar");
            modelBuilder.Entity<User>().ToTable("User", schema: "academicar");
            modelBuilder.Entity<FavoriteUser>().ToTable("FavoriteUser", schema:"academicar")
                .HasOne(f => f.FavUser) 
                .WithMany() 
                .HasForeignKey("UserId")
                .IsRequired();
            modelBuilder.Entity<Preferences>().ToTable("Preferences", schema: "academicar");
            modelBuilder.Entity<Rating>().ToTable("Rating", schema: "academicar");
            modelBuilder.Entity<Vehicle>().ToTable("Vehicle", schema:"academicar");
        }


        #region DB Tables

        // TODO - insert tables here
        // Example:
        public DbSet<TestTable> TestTableEntries { get; set; }
        public DbSet<Stats> Stats { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<FavoriteUser> FavoriteUsers { get; set; }
        public DbSet<Preferences> Preferences { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        #endregion
    }
}
