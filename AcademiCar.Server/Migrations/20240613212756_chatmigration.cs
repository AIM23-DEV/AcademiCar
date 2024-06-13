using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class chatmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chat_Message_FK_Messsage",
                schema: "academicar",
                table: "Chat");

            migrationBuilder.DropIndex(
                name: "IX_Chat_FK_Messsage",
                schema: "academicar",
                table: "Chat");

            migrationBuilder.DropColumn(
                name: "FK_Message",
                schema: "academicar",
                table: "Chat");

            migrationBuilder.DropColumn(
                name: "FK_Messsage",
                schema: "academicar",
                table: "Chat");

            migrationBuilder.RenameColumn(
                name: "Moreas2",
                schema: "academicar",
                table: "Chat",
                newName: "HasMoreThan2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HasMoreThan2",
                schema: "academicar",
                table: "Chat",
                newName: "Moreas2");

            migrationBuilder.AddColumn<int>(
                name: "FK_Message",
                schema: "academicar",
                table: "Chat",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FK_Messsage",
                schema: "academicar",
                table: "Chat",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Chat_FK_Messsage",
                schema: "academicar",
                table: "Chat",
                column: "FK_Messsage");

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
    }
}
