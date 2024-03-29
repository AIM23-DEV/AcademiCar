using AcademiCar.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AcademiCar.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Define your DbSets (tables)
        public DbSet<TestTable> TestTableEntries { get; set; }
        
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestTable>().ToTable("Test_table", schema: "test_schema");
        }
    }
    
}