using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class VehicleEntiyMissings : Migration
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
                newName: "Vehicle_Inspection");

            migrationBuilder.RenameColumn(
                name: "Features",
                schema: "academicar",
                table: "Vehicle",
                newName: "License_Plate");

            migrationBuilder.AddColumn<bool>(
                name: "AC",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Animals",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Automatic",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Bike_Rack",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Brand_Model",
                schema: "academicar",
                table: "Vehicle",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Cruise_Control",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Fuel_Consumption",
                schema: "academicar",
                table: "Vehicle",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Fuel_Type",
                schema: "academicar",
                table: "Vehicle",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Hand_luggage",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Leather",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Led",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Nounting_Roof",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Other",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Plants",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Seat_Heating",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Ski",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Ski_Bag",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Suitcase",
                schema: "academicar",
                table: "Vehicle",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AC",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Animals",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Automatic",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Bike_Rack",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Brand_Model",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Cruise_Control",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Fuel_Consumption",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Fuel_Type",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Hand_luggage",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Leather",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Led",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Nounting_Roof",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Other",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Plants",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Seat_Heating",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Ski",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Ski_Bag",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "Suitcase",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.RenameColumn(
                name: "Vehicle_Inspection",
                schema: "academicar",
                table: "Vehicle",
                newName: "IsElectric");

            migrationBuilder.RenameColumn(
                name: "License_Plate",
                schema: "academicar",
                table: "Vehicle",
                newName: "Features");

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
