using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChatAndMessageMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chat",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Trip = table.Column<int>(type: "integer", nullable: false),
                    FK_User = table.Column<string>(type: "text", nullable: false),
                    HasMoreThan2 = table.Column<bool>(type: "boolean", nullable: false),
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Message",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "Chat",
                schema: "academicar");
        }
    }
}
