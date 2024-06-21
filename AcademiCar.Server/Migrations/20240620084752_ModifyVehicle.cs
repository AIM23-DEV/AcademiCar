using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class ModifyVehicle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicle_User_FK_User",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropIndex(
                name: "IX_Vehicle_FK_User",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.RenameColumn(
                name: "IsElectric",
                schema: "academicar",
                table: "Vehicle",
                newName: "HasVehicleInspection");

            migrationBuilder.RenameColumn(
                name: "Features",
                schema: "academicar",
                table: "Vehicle",
                newName: "LicensePlate");

            migrationBuilder.RenameColumn(
                name: "FK_User",
                schema: "academicar",
                table: "Vehicle",
                newName: "FuelType");

            migrationBuilder.AddColumn<string>(
                name: "BrandModel",
                schema: "academicar",
                table: "Vehicle",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FK_OwnerUser",
                schema: "academicar",
                table: "Vehicle",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FuelConsumption",
                schema: "academicar",
                table: "Vehicle",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "HasAC",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasAnimalSpace",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasAutomatic",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasBikeRack",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasCruiseControl",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasHandLuggageSpace",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasLeather",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasLed",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasMountingOnRoof",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasOtherSpace",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasPlantSpace",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSeatHeating",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSkiBag",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSkiSpace",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSuitcaseSpace",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicle_FK_OwnerUser",
                schema: "academicar",
                table: "Vehicle",
                column: "FK_OwnerUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicle_User_FK_OwnerUser",
                schema: "academicar",
                table: "Vehicle",
                column: "FK_OwnerUser",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicle_User_FK_OwnerUser",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropIndex(
                name: "IX_Vehicle_FK_OwnerUser",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "BrandModel",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "FK_OwnerUser",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "FuelConsumption",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasAC",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasAnimalSpace",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasAutomatic",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasBikeRack",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasCruiseControl",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasHandLuggageSpace",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasLeather",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasLed",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasMountingOnRoof",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasOtherSpace",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasPlantSpace",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasSeatHeating",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasSkiBag",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasSkiSpace",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "HasSuitcaseSpace",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.RenameColumn(
                name: "LicensePlate",
                schema: "academicar",
                table: "Vehicle",
                newName: "Features");

            migrationBuilder.RenameColumn(
                name: "HasVehicleInspection",
                schema: "academicar",
                table: "Vehicle",
                newName: "IsElectric");

            migrationBuilder.RenameColumn(
                name: "FuelType",
                schema: "academicar",
                table: "Vehicle",
                newName: "FK_User");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicle_FK_User",
                schema: "academicar",
                table: "Vehicle",
                column: "FK_User");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicle_User_FK_User",
                schema: "academicar",
                table: "Vehicle",
                column: "FK_User",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
