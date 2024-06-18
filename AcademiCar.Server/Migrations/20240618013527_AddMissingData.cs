using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddMissingData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_User_FK_User",
                schema: "academicar",
                table: "Rating");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Trip_TripID",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_TripID",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Picture",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Picture",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropColumn(
                name: "TripID",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Duration",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropColumn(
                name: "PassengerRating",
                schema: "academicar",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "Image",
                schema: "academicar",
                table: "Carlos");

            migrationBuilder.RenameColumn(
                name: "DriverRating",
                schema: "academicar",
                table: "Stats",
                newName: "PassengerKilometres");

            migrationBuilder.RenameColumn(
                name: "FK_User",
                schema: "academicar",
                table: "Rating",
                newName: "FK_RatingUser");

            migrationBuilder.RenameIndex(
                name: "IX_Rating_FK_User",
                schema: "academicar",
                table: "Rating",
                newName: "IX_Rating_FK_RatingUser");

            migrationBuilder.AddColumn<string>(
                name: "PictureSrc",
                schema: "academicar",
                table: "Vehicle",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "FK_Address",
                schema: "academicar",
                table: "User",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PictureSrc",
                schema: "academicar",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "Price",
                schema: "academicar",
                table: "Trip",
                type: "real",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AddColumn<int>(
                name: "DriverKilometres",
                schema: "academicar",
                table: "Stats",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                schema: "academicar",
                table: "Rating",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FK_RatedUser",
                schema: "academicar",
                table: "Rating",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageSrc",
                schema: "academicar",
                table: "Carlos",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "InterestPreference",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Preferences = table.Column<int>(type: "integer", nullable: false),
                    Interest = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterestPreference", x => x.ID);
                    table.ForeignKey(
                        name: "FK_InterestPreference_Preferences_FK_Preferences",
                        column: x => x.FK_Preferences,
                        principalSchema: "academicar",
                        principalTable: "Preferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MusicPreference",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Preferences = table.Column<int>(type: "integer", nullable: false),
                    Genre = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MusicPreference", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MusicPreference_Preferences_FK_Preferences",
                        column: x => x.FK_Preferences,
                        principalSchema: "academicar",
                        principalTable: "Preferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TravelPreference",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Preferences = table.Column<int>(type: "integer", nullable: false),
                    PreferenceText = table.Column<string>(type: "text", nullable: false),
                    IconType = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TravelPreference", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TravelPreference_Preferences_FK_Preferences",
                        column: x => x.FK_Preferences,
                        principalSchema: "academicar",
                        principalTable: "Preferences",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TripPassenger",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Trip = table.Column<int>(type: "integer", nullable: false),
                    FK_PassengerUser = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripPassenger", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TripPassenger_Trip_FK_Trip",
                        column: x => x.FK_Trip,
                        principalSchema: "academicar",
                        principalTable: "Trip",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TripPassenger_User_FK_PassengerUser",
                        column: x => x.FK_PassengerUser,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TripStop",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Trip = table.Column<int>(type: "integer", nullable: false),
                    FK_StopAddress = table.Column<int>(type: "integer", nullable: false),
                    StopDurationInMinutes = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripStop", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TripStop_Address_FK_StopAddress",
                        column: x => x.FK_StopAddress,
                        principalSchema: "academicar",
                        principalTable: "Address",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TripStop_Trip_FK_Trip",
                        column: x => x.FK_Trip,
                        principalSchema: "academicar",
                        principalTable: "Trip",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_FK_Address",
                schema: "academicar",
                table: "User",
                column: "FK_Address");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_FK_RatedUser",
                schema: "academicar",
                table: "Rating",
                column: "FK_RatedUser");

            migrationBuilder.CreateIndex(
                name: "IX_InterestPreference_FK_Preferences",
                schema: "academicar",
                table: "InterestPreference",
                column: "FK_Preferences");

            migrationBuilder.CreateIndex(
                name: "IX_MusicPreference_FK_Preferences",
                schema: "academicar",
                table: "MusicPreference",
                column: "FK_Preferences");

            migrationBuilder.CreateIndex(
                name: "IX_TravelPreference_FK_Preferences",
                schema: "academicar",
                table: "TravelPreference",
                column: "FK_Preferences");

            migrationBuilder.CreateIndex(
                name: "IX_TripPassenger_FK_PassengerUser",
                schema: "academicar",
                table: "TripPassenger",
                column: "FK_PassengerUser");

            migrationBuilder.CreateIndex(
                name: "IX_TripPassenger_FK_Trip",
                schema: "academicar",
                table: "TripPassenger",
                column: "FK_Trip");

            migrationBuilder.CreateIndex(
                name: "IX_TripStop_FK_StopAddress",
                schema: "academicar",
                table: "TripStop",
                column: "FK_StopAddress");

            migrationBuilder.CreateIndex(
                name: "IX_TripStop_FK_Trip",
                schema: "academicar",
                table: "TripStop",
                column: "FK_Trip");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_User_FK_RatedUser",
                schema: "academicar",
                table: "Rating",
                column: "FK_RatedUser",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_User_FK_RatingUser",
                schema: "academicar",
                table: "Rating",
                column: "FK_RatingUser",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Address_FK_Address",
                schema: "academicar",
                table: "User",
                column: "FK_Address",
                principalSchema: "academicar",
                principalTable: "Address",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_User_FK_RatedUser",
                schema: "academicar",
                table: "Rating");

            migrationBuilder.DropForeignKey(
                name: "FK_Rating_User_FK_RatingUser",
                schema: "academicar",
                table: "Rating");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Address_FK_Address",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropTable(
                name: "InterestPreference",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "MusicPreference",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "TravelPreference",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "TripPassenger",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "TripStop",
                schema: "academicar");

            migrationBuilder.DropIndex(
                name: "IX_User_FK_Address",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Rating_FK_RatedUser",
                schema: "academicar",
                table: "Rating");

            migrationBuilder.DropColumn(
                name: "PictureSrc",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "FK_Address",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropColumn(
                name: "PictureSrc",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropColumn(
                name: "DriverKilometres",
                schema: "academicar",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "Comment",
                schema: "academicar",
                table: "Rating");

            migrationBuilder.DropColumn(
                name: "FK_RatedUser",
                schema: "academicar",
                table: "Rating");

            migrationBuilder.DropColumn(
                name: "ImageSrc",
                schema: "academicar",
                table: "Carlos");

            migrationBuilder.RenameColumn(
                name: "PassengerKilometres",
                schema: "academicar",
                table: "Stats",
                newName: "DriverRating");

            migrationBuilder.RenameColumn(
                name: "FK_RatingUser",
                schema: "academicar",
                table: "Rating",
                newName: "FK_User");

            migrationBuilder.RenameIndex(
                name: "IX_Rating_FK_RatingUser",
                schema: "academicar",
                table: "Rating",
                newName: "IX_Rating_FK_User");

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                schema: "academicar",
                table: "Vehicle",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                schema: "academicar",
                table: "User",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TripID",
                schema: "academicar",
                table: "User",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                schema: "academicar",
                table: "Trip",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<decimal>(
                name: "Duration",
                schema: "academicar",
                table: "Trip",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<float>(
                name: "PassengerRating",
                schema: "academicar",
                table: "Stats",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                schema: "academicar",
                table: "Carlos",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);

            migrationBuilder.CreateIndex(
                name: "IX_User_TripID",
                schema: "academicar",
                table: "User",
                column: "TripID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_User_FK_User",
                schema: "academicar",
                table: "Rating",
                column: "FK_User",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Trip_TripID",
                schema: "academicar",
                table: "User",
                column: "TripID",
                principalSchema: "academicar",
                principalTable: "Trip",
                principalColumn: "ID");
        }
    }
}
