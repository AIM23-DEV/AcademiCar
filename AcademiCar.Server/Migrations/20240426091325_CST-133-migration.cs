using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class CST133migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "academicar");

            migrationBuilder.CreateTable(
                name: "Stats",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    NrTrips = table.Column<int>(type: "integer", nullable: false),
                    CO2Savings = table.Column<float>(type: "real", nullable: false),
                    DriverRating = table.Column<int>(type: "integer", nullable: false),
                    PassengerRating = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stats", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Picture = table.Column<byte[]>(type: "bytea", nullable: false),
                    FK_Stats = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.ID);
                    table.ForeignKey(
                        name: "FK_User_Stats_FK_Stats",
                        column: x => x.FK_Stats,
                        principalSchema: "academicar",
                        principalTable: "Stats",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FavoriteUser",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    UserID = table.Column<int>(type: "integer", nullable: false),
                    FavUserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavoriteUser", x => x.ID);
                    table.ForeignKey(
                        name: "FK_FavoriteUser_User_UserID",
                        column: x => x.UserID,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FavoriteUser_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Preferences",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_User = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preferences", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Preferences_User_FK_User",
                        column: x => x.FK_User,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rating",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_User = table.Column<int>(type: "integer", nullable: false),
                    IsDriver = table.Column<bool>(type: "boolean", nullable: false),
                    IsPassenger = table.Column<bool>(type: "boolean", nullable: false),
                    Score = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Rating_User_FK_User",
                        column: x => x.FK_User,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteUser_UserId",
                schema: "academicar",
                table: "FavoriteUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FavoriteUser_UserID",
                schema: "academicar",
                table: "FavoriteUser",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Preferences_FK_User",
                schema: "academicar",
                table: "Preferences",
                column: "FK_User");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_FK_User",
                schema: "academicar",
                table: "Rating",
                column: "FK_User");

            migrationBuilder.CreateIndex(
                name: "IX_User_FK_Stats",
                schema: "academicar",
                table: "User",
                column: "FK_Stats");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FavoriteUser",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "Preferences",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "Rating",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "User",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "Stats",
                schema: "academicar");
        }
    }
}
