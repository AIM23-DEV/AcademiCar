using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class chatmessagetable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserClaims_User_UserId",
                table: "AspNetUserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserLogins_User_UserId",
                table: "AspNetUserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_User_UserId",
                table: "AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserTokens_User_UserId",
                table: "AspNetUserTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteUser_User_FavUserId",
                schema: "academicar",
                table: "FavoriteUser");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteUser_User_UserId",
                schema: "academicar",
                table: "FavoriteUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Preferences_User_FK_User",
                schema: "academicar",
                table: "Preferences");

            migrationBuilder.DropForeignKey(
                name: "FK_Rating_User_FK_User",
                schema: "academicar",
                table: "Rating");

            migrationBuilder.DropForeignKey(
                name: "FK_Trip_User_FK_Driver",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropForeignKey(
                name: "FK_TripRequest_User_FK_PotentialPassenger",
                schema: "academicar",
                table: "TripRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Stats_FK_Stats",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Trip_TripID",
                schema: "academicar",
                table: "User");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicle_User_FK_User",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                schema: "academicar",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                schema: "academicar",
                newName: "Message",
                newSchema: "academicar");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "academicar",
                table: "FavoriteUser",
                newName: "FK_UserId");

            migrationBuilder.RenameColumn(
                name: "FavUserId",
                schema: "academicar",
                table: "FavoriteUser",
                newName: "FK_FavUserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteUser_UserId",
                schema: "academicar",
                table: "FavoriteUser",
                newName: "IX_FavoriteUser_FK_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteUser_FavUserId",
                schema: "academicar",
                table: "FavoriteUser",
                newName: "IX_FavoriteUser_FK_FavUserId");

            migrationBuilder.RenameIndex(
                name: "IX_User_TripID",
                schema: "academicar",
                table: "Message",
                newName: "IX_Message_TripID");

            migrationBuilder.RenameIndex(
                name: "IX_User_FK_Stats",
                schema: "academicar",
                table: "Message",
                newName: "IX_Message_FK_Stats");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Message",
                schema: "academicar",
                table: "Message",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserClaims_Message_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserLogins_Message_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_Message_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserTokens_Message_UserId",
                table: "AspNetUserTokens",
                column: "UserId",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteUser_Message_FK_FavUserId",
                schema: "academicar",
                table: "FavoriteUser",
                column: "FK_FavUserId",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteUser_Message_FK_UserId",
                schema: "academicar",
                table: "FavoriteUser",
                column: "FK_UserId",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Stats_FK_Stats",
                schema: "academicar",
                table: "Message",
                column: "FK_Stats",
                principalSchema: "academicar",
                principalTable: "Stats",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Trip_TripID",
                schema: "academicar",
                table: "Message",
                column: "TripID",
                principalSchema: "academicar",
                principalTable: "Trip",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Preferences_Message_FK_User",
                schema: "academicar",
                table: "Preferences",
                column: "FK_User",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_Message_FK_User",
                schema: "academicar",
                table: "Rating",
                column: "FK_User",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trip_Message_FK_Driver",
                schema: "academicar",
                table: "Trip",
                column: "FK_Driver",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripRequest_Message_FK_PotentialPassenger",
                schema: "academicar",
                table: "TripRequest",
                column: "FK_PotentialPassenger",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicle_Message_FK_User",
                schema: "academicar",
                table: "Vehicle",
                column: "FK_User",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserClaims_Message_UserId",
                table: "AspNetUserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserLogins_Message_UserId",
                table: "AspNetUserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_Message_UserId",
                table: "AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserTokens_Message_UserId",
                table: "AspNetUserTokens");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteUser_Message_FK_FavUserId",
                schema: "academicar",
                table: "FavoriteUser");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteUser_Message_FK_UserId",
                schema: "academicar",
                table: "FavoriteUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Stats_FK_Stats",
                schema: "academicar",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Trip_TripID",
                schema: "academicar",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Preferences_Message_FK_User",
                schema: "academicar",
                table: "Preferences");

            migrationBuilder.DropForeignKey(
                name: "FK_Rating_Message_FK_User",
                schema: "academicar",
                table: "Rating");

            migrationBuilder.DropForeignKey(
                name: "FK_Trip_Message_FK_Driver",
                schema: "academicar",
                table: "Trip");

            migrationBuilder.DropForeignKey(
                name: "FK_TripRequest_Message_FK_PotentialPassenger",
                schema: "academicar",
                table: "TripRequest");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicle_Message_FK_User",
                schema: "academicar",
                table: "Vehicle");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Message",
                schema: "academicar",
                table: "Message");

            migrationBuilder.RenameTable(
                name: "Message",
                schema: "academicar",
                newName: "User",
                newSchema: "academicar");

            migrationBuilder.RenameColumn(
                name: "FK_UserId",
                schema: "academicar",
                table: "FavoriteUser",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "FK_FavUserId",
                schema: "academicar",
                table: "FavoriteUser",
                newName: "FavUserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteUser_FK_UserId",
                schema: "academicar",
                table: "FavoriteUser",
                newName: "IX_FavoriteUser_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteUser_FK_FavUserId",
                schema: "academicar",
                table: "FavoriteUser",
                newName: "IX_FavoriteUser_FavUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Message_TripID",
                schema: "academicar",
                table: "User",
                newName: "IX_User_TripID");

            migrationBuilder.RenameIndex(
                name: "IX_Message_FK_Stats",
                schema: "academicar",
                table: "User",
                newName: "IX_User_FK_Stats");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                schema: "academicar",
                table: "User",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserClaims_User_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserLogins_User_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_User_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserTokens_User_UserId",
                table: "AspNetUserTokens",
                column: "UserId",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteUser_User_FavUserId",
                schema: "academicar",
                table: "FavoriteUser",
                column: "FavUserId",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteUser_User_UserId",
                schema: "academicar",
                table: "FavoriteUser",
                column: "UserId",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Preferences_User_FK_User",
                schema: "academicar",
                table: "Preferences",
                column: "FK_User",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
                name: "FK_Trip_User_FK_Driver",
                schema: "academicar",
                table: "Trip",
                column: "FK_Driver",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
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

            migrationBuilder.AddForeignKey(
                name: "FK_User_Stats_FK_Stats",
                schema: "academicar",
                table: "User",
                column: "FK_Stats",
                principalSchema: "academicar",
                principalTable: "Stats",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Trip_TripID",
                schema: "academicar",
                table: "User",
                column: "TripID",
                principalSchema: "academicar",
                principalTable: "Trip",
                principalColumn: "ID");

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
