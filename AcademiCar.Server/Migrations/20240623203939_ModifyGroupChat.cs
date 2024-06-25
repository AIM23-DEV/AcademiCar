using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class ModifyGroupChat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupChat_Trip_FK_Trip",
                schema: "academicar",
                table: "GroupChat");

            migrationBuilder.DropForeignKey(
                name: "FK_Trip_Address_FK_EndAddress",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropForeignKey(
                name: "FK_Trip_Address_FK_StartAddress",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropForeignKey(
                name: "FK_Trip_User_FK_Driver",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropForeignKey(
                name: "FK_Trip_Vehicle_FK_Vehicle",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropForeignKey(
                name: "FK_TripRequest_Trip_FK_Trip",
                schema: "academicar",
                table: "TripRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_TripRequest_User_FK_PotentialPassenger",
                schema: "academicar",
                table: "TripRequest");

            migrationBuilder.DropIndex(
                name: "IX_TripRequest_FK_PotentialPassenger",
                schema: "academicar",
                table: "TripRequest");

            migrationBuilder.DropIndex(
                name: "IX_TripRequest_FK_Trip",
                schema: "academicar",
                table: "TripRequest");

            migrationBuilder.DropIndex(
                name: "IX_Trip_FK_Driver",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropIndex(
                name: "IX_Trip_FK_EndAddress",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropIndex(
                name: "IX_Trip_FK_StartAddress",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropIndex(
                name: "IX_Trip_FK_Vehicle",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropIndex(
                name: "IX_GroupChat_FK_Trip",
                schema: "academicar",
                table: "GroupChat");

            migrationBuilder.AddColumn<string>(
                name: "LastMessageContent",
                schema: "academicar",
                table: "GroupChat",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TripTitle",
                schema: "academicar",
                table: "GroupChat",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastMessageContent",
                schema: "academicar",
                table: "GroupChat");

            migrationBuilder.DropColumn(
                name: "TripTitle",
                schema: "academicar",
                table: "GroupChat");

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
                name: "IX_GroupChat_FK_Trip",
                schema: "academicar",
                table: "GroupChat",
                column: "FK_Trip");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupChat_Trip_FK_Trip",
                schema: "academicar",
                table: "GroupChat",
                column: "FK_Trip",
                principalSchema: "academicar",
                principalTable: "Trip",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trip_Address_FK_EndAddress",
                schema: "academicar",
                table: "Trip",
                column: "FK_EndAddress",
                principalSchema: "academicar",
                principalTable: "Address",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trip_Address_FK_StartAddress",
                schema: "academicar",
                table: "Trip",
                column: "FK_StartAddress",
                principalSchema: "academicar",
                principalTable: "Address",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trip_User_FK_Driver",
                schema: "academicar",
                table: "Trip",
                column: "FK_Driver",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trip_Vehicle_FK_Vehicle",
                schema: "academicar",
                table: "Trip",
                column: "FK_Vehicle",
                principalSchema: "academicar",
                principalTable: "Vehicle",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripRequest_Trip_FK_Trip",
                schema: "academicar",
                table: "TripRequest",
                column: "FK_Trip",
                principalSchema: "academicar",
                principalTable: "Trip",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripRequest_User_FK_PotentialPassenger",
                schema: "academicar",
                table: "TripRequest",
                column: "FK_PotentialPassenger",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
