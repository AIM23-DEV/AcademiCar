using AcademiCar.Server.DAL.BaseInterfaces;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.UnitOfWork
{
    public class PostgresDbContext : IdentityDbContext<User>
    {
        public PostgresDbContext(DbContextOptions<PostgresDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensure Identity tables are created

            // Configure the FavoriteUser entity
            modelBuilder.Entity<FavoriteUser>(entity =>
            {
                entity.HasOne(fu => fu.FavUser)
                      .WithMany()
                      .HasForeignKey(fu => fu.FK_FavUserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
            
            modelBuilder.Entity<Stats>().ToTable("Stats", schema: "academicar");
            modelBuilder.Entity<FavoriteUser>().ToTable("FavoriteUser", schema: "academicar");
            modelBuilder.Entity<Preferences>().ToTable("Preferences", schema: "academicar");
            modelBuilder.Entity<Rating>().ToTable("Rating", schema: "academicar");
            modelBuilder.Entity<Vehicle>().ToTable("Vehicle", schema: "academicar");
            modelBuilder.Entity<Trip>().ToTable("Trip", schema: "academicar");
            modelBuilder.Entity<TripRequest>().ToTable("TripRequest", schema: "academicar");
            modelBuilder.Entity<Address>().ToTable("Address", schema: "academicar");
            modelBuilder.Entity<User>().ToTable("User", schema: "academicar");
            modelBuilder.Entity<Chat>().ToTable("Chat", schema: "academicar");
            modelBuilder.Entity<Message>().ToTable("Message", schema: "academicar");
        }

        // Your DbSets
        public DbSet<Stats> Stats { get; set; }
        public DbSet<FavoriteUser> FavoriteUsers { get; set; }
        public DbSet<Preferences> Preferences { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripRequest> TripRequests { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
