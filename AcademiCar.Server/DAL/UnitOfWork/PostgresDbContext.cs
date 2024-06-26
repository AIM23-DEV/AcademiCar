﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AcademiCar.Server.DAL.Entities;

namespace AcademiCar.Server.DAL.UnitOfWork
{
    public class PostgresDbContext : IdentityDbContext<User>
    {
        public PostgresDbContext(DbContextOptions<PostgresDbContext> options) : base(options)
        {
        }

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

            modelBuilder.Entity<Address>().ToTable("Address", schema: "academicar");
            modelBuilder.Entity<Carlos>().ToTable("Carlos", schema: "academicar");
            modelBuilder.Entity<GroupChat>().ToTable("GroupChat", schema: "academicar");
            modelBuilder.Entity<GroupChatUser>().ToTable("GroupChatUser", schema: "academicar");
            modelBuilder.Entity<GroupMessage>().ToTable("GroupMessage", schema: "academicar");
            modelBuilder.Entity<FavoriteUser>().ToTable("FavoriteUser", schema: "academicar");
            modelBuilder.Entity<InterestPreference>().ToTable("InterestPreference", schema: "academicar");
            modelBuilder.Entity<PersonalChat>().ToTable("PersonalChat", schema: "academicar");
            modelBuilder.Entity<PersonalMessage>().ToTable("PersonalMessage", schema: "academicar");
            modelBuilder.Entity<MusicPreference>().ToTable("MusicPreference", schema: "academicar");
            modelBuilder.Entity<Preferences>().ToTable("Preferences", schema: "academicar");
            modelBuilder.Entity<Rating>().ToTable("Rating", schema: "academicar");
            modelBuilder.Entity<Stats>().ToTable("Stats", schema: "academicar");
            modelBuilder.Entity<TravelPreference>().ToTable("TravelPreference", schema: "academicar");
            modelBuilder.Entity<Trip>().ToTable("Trip", schema: "academicar");
            modelBuilder.Entity<TripPassenger>().ToTable("TripPassenger", schema: "academicar");
            modelBuilder.Entity<TripRequest>().ToTable("TripRequest", schema: "academicar");
            modelBuilder.Entity<TripStop>().ToTable("TripStop", schema: "academicar");
            modelBuilder.Entity<User>().ToTable("User", schema: "academicar");
            modelBuilder.Entity<Vehicle>().ToTable("Vehicle", schema: "academicar");
            modelBuilder.Entity<Balance>().ToTable("Balance", schema: "academicar");
            modelBuilder.Entity<Transaction>().ToTable("Transaction", schema: "academicar");
        }

        // Your DbSets
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Carlos> Carlos { get; set; }
        public DbSet<GroupChat> GroupChats { get; set; }
        public DbSet<GroupChatUser> GroupChatsUsers { get; set; }
        public DbSet<GroupMessage> GroupMessages { get; set; }
        public DbSet<FavoriteUser> FavoriteUsers { get; set; }
        public DbSet<InterestPreference> InterestPreferences { get; set; }
        public DbSet<PersonalChat> PersonalChats { get; set; }
        public DbSet<PersonalMessage> PersonalMessages { get; set; }
        public DbSet<MusicPreference> MusicPreferences { get; set; }
        public DbSet<Preferences> Preferences { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Stats> Stats { get; set; }
        public DbSet<TravelPreference> TravelPreferences { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<TripPassenger> TripPassengers { get; set; }
        public DbSet<TripRequest> TripRequests { get; set; }
        public DbSet<TripStop> TripStops { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Balance> Balances { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}