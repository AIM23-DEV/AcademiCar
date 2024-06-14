using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class carlos : Migration
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
                name: "Carlos",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Message = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<byte[]>(type: "bytea", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carlos", x => x.ID);
                });

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

            migrationBuilder.DropTable(
                name: "Carlos",
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
