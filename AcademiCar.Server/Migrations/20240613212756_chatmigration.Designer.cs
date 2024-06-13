﻿// <auto-generated />
using System;
using AcademiCar.Server.DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    [DbContext(typeof(PostgresDbContext))]
    [Migration("20240613212756_chatmigration")]
    partial class chatmigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Address", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("Latitude")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Longitude")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Number")
                        .HasColumnType("integer");

                    b.Property<string>("Place")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Street")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ZIP")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.ToTable("Address", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Chat", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("FK_Trip")
                        .HasColumnType("integer");

                    b.Property<string>("FK_User")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("HasMoreThan2")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ID");

                    b.HasIndex("FK_Trip");

                    b.HasIndex("FK_User");

                    b.ToTable("Chat", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.FavoriteUser", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("FK_FavUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FK_UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("FK_FavUserId");

                    b.HasIndex("FK_UserId");

                    b.ToTable("FavoriteUser", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Message", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<int>("FK_Chat")
                        .HasColumnType("integer");

                    b.Property<int>("FK_TripRequest")
                        .HasColumnType("integer");

                    b.Property<string>("FK_User")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("SentAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ID");

                    b.HasIndex("FK_Chat");

                    b.HasIndex("FK_TripRequest");

                    b.HasIndex("FK_User");

                    b.ToTable("Message", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Preferences", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("FK_User")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("FK_User");

                    b.ToTable("Preferences", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Rating", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("FK_User")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsDriver")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPassenger")
                        .HasColumnType("boolean");

                    b.Property<int>("Score")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("FK_User");

                    b.ToTable("Rating", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Stats", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<float>("CO2Savings")
                        .HasColumnType("real");

                    b.Property<int>("DriverRating")
                        .HasColumnType("integer");

                    b.Property<int>("NrTrips")
                        .HasColumnType("integer");

                    b.Property<float>("PassengerRating")
                        .HasColumnType("real");

                    b.HasKey("ID");

                    b.ToTable("Stats", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Trip", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("AvailableSeats")
                        .HasColumnType("integer");

                    b.Property<decimal>("Duration")
                        .HasColumnType("numeric");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FK_Driver")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("FK_EndAddress")
                        .HasColumnType("integer");

                    b.Property<int>("FK_StartAddress")
                        .HasColumnType("integer");

                    b.Property<int>("FK_Vehicle")
                        .HasColumnType("integer");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("FK_Driver");

                    b.HasIndex("FK_EndAddress");

                    b.HasIndex("FK_StartAddress");

                    b.HasIndex("FK_Vehicle");

                    b.ToTable("Trip", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.TripRequest", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FK_PotentialPassenger")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("FK_Trip")
                        .HasColumnType("integer");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("FK_PotentialPassenger");

                    b.HasIndex("FK_Trip");

                    b.ToTable("TripRequest", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<int>("FK_Stats")
                        .HasColumnType("integer");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<byte[]>("Picture")
                        .HasColumnType("bytea");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<int?>("TripID")
                        .HasColumnType("integer");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("FK_Stats");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.HasIndex("TripID");

                    b.ToTable("User", "academicar");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Vehicle", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FK_User")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Features")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsElectric")
                        .HasColumnType("boolean");

                    b.Property<byte[]>("Picture")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<int>("Seats")
                        .HasColumnType("integer");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("FK_User");

                    b.ToTable("Vehicle", "academicar");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Chat", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.Trip", "Trip")
                        .WithMany()
                        .HasForeignKey("FK_Trip")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("FK_User")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Trip");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.FavoriteUser", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.User", "FavUser")
                        .WithMany()
                        .HasForeignKey("FK_FavUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.User", "User")
                        .WithMany("Favorits")
                        .HasForeignKey("FK_UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FavUser");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Message", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.Chat", "Chat")
                        .WithMany()
                        .HasForeignKey("FK_Chat")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.TripRequest", "TripRequest")
                        .WithMany()
                        .HasForeignKey("FK_TripRequest")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("FK_User")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("TripRequest");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Preferences", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("FK_User")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Rating", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("FK_User")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Trip", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.User", "Driver")
                        .WithMany()
                        .HasForeignKey("FK_Driver")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.Address", "EndAddress")
                        .WithMany()
                        .HasForeignKey("FK_EndAddress")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.Address", "StartAddress")
                        .WithMany()
                        .HasForeignKey("FK_StartAddress")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("FK_Vehicle")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Driver");

                    b.Navigation("EndAddress");

                    b.Navigation("StartAddress");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.TripRequest", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.User", "PotentialPassenger")
                        .WithMany()
                        .HasForeignKey("FK_PotentialPassenger")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.Trip", "Trip")
                        .WithMany()
                        .HasForeignKey("FK_Trip")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PotentialPassenger");

                    b.Navigation("Trip");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.User", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.Stats", "Stats")
                        .WithMany()
                        .HasForeignKey("FK_Stats")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.Trip", null)
                        .WithMany("Passengers")
                        .HasForeignKey("TripID");

                    b.Navigation("Stats");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Vehicle", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("FK_User")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AcademiCar.Server.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("AcademiCar.Server.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.Trip", b =>
                {
                    b.Navigation("Passengers");
                });

            modelBuilder.Entity("AcademiCar.Server.DAL.Entities.User", b =>
                {
                    b.Navigation("Favorits");
                });
#pragma warning restore 612, 618
        }
    }
}
