using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class CST132trips : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TripID",
                schema: "academicar",
                table: "User",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Adress",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Street = table.Column<string>(type: "text", nullable: false),
                    Number = table.Column<int>(type: "integer", nullable: false),
                    ZIP = table.Column<int>(type: "integer", nullable: false),
                    Place = table.Column<string>(type: "text", nullable: false),
                    Longitude = table.Column<string>(type: "text", nullable: false),
                    Latitude = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adress", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Trip",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    FK_Driver = table.Column<int>(type: "integer", nullable: false),
                    FK_Vehicle = table.Column<int>(type: "integer", nullable: false),
                    FK_StartAddress = table.Column<int>(type: "integer", nullable: false),
                    FK_EndAddress = table.Column<int>(type: "integer", nullable: false),
                    StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Duration = table.Column<decimal>(type: "numeric", nullable: false),
                    AvailableSeats = table.Column<int>(type: "integer", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    PaymentMethod = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trip", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Trip_Adress_FK_EndAddress",
                        column: x => x.FK_EndAddress,
                        principalSchema: "academicar",
                        principalTable: "Adress",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Trip_Adress_FK_StartAddress",
                        column: x => x.FK_StartAddress,
                        principalSchema: "academicar",
                        principalTable: "Adress",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Trip_User_FK_Driver",
                        column: x => x.FK_Driver,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Trip_Vehicle_FK_Vehicle",
                        column: x => x.FK_Vehicle,
                        principalSchema: "academicar",
                        principalTable: "Vehicle",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TripRequest",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Trip = table.Column<int>(type: "integer", nullable: false),
                    FK_PotentialPassenger = table.Column<int>(type: "integer", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripRequest", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TripRequest_Trip_FK_Trip",
                        column: x => x.FK_Trip,
                        principalSchema: "academicar",
                        principalTable: "Trip",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TripRequest_User_FK_PotentialPassenger",
                        column: x => x.FK_PotentialPassenger,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_TripID",
                schema: "academicar",
                table: "User",
                column: "TripID");

            migrationBuilder.CreateIndex(
                name: "IX_Trip_FK_Driver",
                schema: "academicar",
                table: "Trip",
                column: "FK_Driver");

            migrationBuilder.CreateIndex(
                name: "IX_Trip_FK_EndAddress",
                schema: "academicar",
                table: "Trip",
                column: "FK_EndAddress");

            migrationBuilder.CreateIndex(
                name: "IX_Trip_FK_StartAddress",
                schema: "academicar",
                table: "Trip",
                column: "FK_StartAddress");

            migrationBuilder.CreateIndex(
                name: "IX_Trip_FK_Vehicle",
                schema: "academicar",
                table: "Trip",
                column: "FK_Vehicle");

            migrationBuilder.CreateIndex(
                name: "IX_TripRequest_FK_PotentialPassenger",
                schema: "academicar",
                table: "TripRequest",
                column: "FK_PotentialPassenger");

            migrationBuilder.CreateIndex(
                name: "IX_TripRequest_FK_Trip",
                schema: "academicar",
                table: "TripRequest",
                column: "FK_Trip");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Trip_TripID",
                schema: "academicar",
                table: "User",
                column: "TripID",
                principalSchema: "academicar",
                principalTable: "Trip",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Trip_TripID",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropTable(
                name: "TripRequest",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "Trip",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "Adress",
                schema: "academicar");

            migrationBuilder.DropIndex(
                name: "IX_User_TripID",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropColumn(
                name: "TripID",
                schema: "academicar",
                table: "User");
        }
    }
}
