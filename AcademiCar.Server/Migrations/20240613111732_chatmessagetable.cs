using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

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
                name: "FK_FavoriteUser_User_FavUserId",
                schema: "academicar",
                table: "FavoriteUser");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteUser_User_UserId",
                schema: "academicar",
                table: "FavoriteUser");

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

            migrationBuilder.CreateTable(
                name: "Chat",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Trip = table.Column<int>(type: "integer", nullable: false),
                    FK_User = table.Column<string>(type: "text", nullable: false),
                    FK_Messsage = table.Column<int>(type: "integer", nullable: false),
                    FK_Message = table.Column<int>(type: "integer", nullable: false),
                    Moreas2 = table.Column<bool>(type: "boolean", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chat", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Chat_Trip_FK_Trip",
                        column: x => x.FK_Trip,
                        principalSchema: "academicar",
                        principalTable: "Trip",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Chat_User_FK_User",
                        column: x => x.FK_User,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_User = table.Column<string>(type: "text", nullable: false),
                    FK_Chat = table.Column<int>(type: "integer", nullable: false),
                    FK_TripRequest = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Message_Chat_FK_Chat",
                        column: x => x.FK_Chat,
                        principalSchema: "academicar",
                        principalTable: "Chat",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Message_TripRequest_FK_TripRequest",
                        column: x => x.FK_TripRequest,
                        principalSchema: "academicar",
                        principalTable: "TripRequest",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Message_User_FK_User",
                        column: x => x.FK_User,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Chat_FK_Messsage",
                schema: "academicar",
                table: "Chat",
                column: "FK_Messsage");

            migrationBuilder.CreateIndex(
                name: "IX_Chat_FK_Trip",
                schema: "academicar",
                table: "Chat",
                column: "FK_Trip");

            migrationBuilder.CreateIndex(
                name: "IX_Chat_FK_User",
                schema: "academicar",
                table: "Chat",
                column: "FK_User");

            migrationBuilder.CreateIndex(
                name: "IX_Message_FK_Chat",
                schema: "academicar",
                table: "Message",
                column: "FK_Chat");

            migrationBuilder.CreateIndex(
                name: "IX_Message_FK_TripRequest",
                schema: "academicar",
                table: "Message",
                column: "FK_TripRequest");

            migrationBuilder.CreateIndex(
                name: "IX_Message_FK_User",
                schema: "academicar",
                table: "Message",
                column: "FK_User");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteUser_User_FK_FavUserId",
                schema: "academicar",
                table: "FavoriteUser",
                column: "FK_FavUserId",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteUser_User_FK_UserId",
                schema: "academicar",
                table: "FavoriteUser",
                column: "FK_UserId",
                principalSchema: "academicar",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Chat_Message_FK_Messsage",
                schema: "academicar",
                table: "Chat",
                column: "FK_Messsage",
                principalSchema: "academicar",
                principalTable: "Message",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteUser_User_FK_FavUserId",
                schema: "academicar",
                table: "FavoriteUser");

            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteUser_User_FK_UserId",
                schema: "academicar",
                table: "FavoriteUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Chat_Message_FK_Messsage",
                schema: "academicar",
                table: "Chat");

            migrationBuilder.DropTable(
                name: "Message",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "Chat",
                schema: "academicar");

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
        }
    }
}
