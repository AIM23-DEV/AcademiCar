using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class ModifyChat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonalMessage",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "Chat",
                schema: "academicar");

            migrationBuilder.CreateTable(
                name: "GroupChat",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Trip = table.Column<int>(type: "integer", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupChat", x => x.ID);
                    table.ForeignKey(
                        name: "FK_GroupChat_Trip_FK_Trip",
                        column: x => x.FK_Trip,
                        principalSchema: "academicar",
                        principalTable: "Trip",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PersonalChat",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_Trip = table.Column<int>(type: "integer", nullable: false),
                    FK_DriverUser = table.Column<string>(type: "text", nullable: false),
                    FK_PassengerUser = table.Column<string>(type: "text", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalChat", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PersonalChat_Trip_FK_Trip",
                        column: x => x.FK_Trip,
                        principalSchema: "academicar",
                        principalTable: "Trip",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonalChat_User_FK_DriverUser",
                        column: x => x.FK_DriverUser,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonalChat_User_FK_PassengerUser",
                        column: x => x.FK_PassengerUser,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GroupChatUser",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_GroupChat = table.Column<int>(type: "integer", nullable: false),
                    FK_User = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupChatUser", x => x.ID);
                    table.ForeignKey(
                        name: "FK_GroupChatUser_GroupChat_FK_GroupChat",
                        column: x => x.FK_GroupChat,
                        principalSchema: "academicar",
                        principalTable: "GroupChat",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupChatUser_User_FK_User",
                        column: x => x.FK_User,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GroupMessage",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_SenderUser = table.Column<string>(type: "text", nullable: false),
                    FK_GroupChat = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupMessage", x => x.ID);
                    table.ForeignKey(
                        name: "FK_GroupMessage_GroupChat_FK_GroupChat",
                        column: x => x.FK_GroupChat,
                        principalSchema: "academicar",
                        principalTable: "GroupChat",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupMessage_User_FK_SenderUser",
                        column: x => x.FK_SenderUser,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PersonalMessage",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FK_SenderUser = table.Column<string>(type: "text", nullable: false),
                    FK_PersonalChat = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: true),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalMessage", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PersonalMessage_PersonalChat_FK_PersonalChat",
                        column: x => x.FK_PersonalChat,
                        principalSchema: "academicar",
                        principalTable: "PersonalChat",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonalMessage_User_FK_SenderUser",
                        column: x => x.FK_SenderUser,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupChat_FK_Trip",
                schema: "academicar",
                table: "GroupChat",
                column: "FK_Trip");

            migrationBuilder.CreateIndex(
                name: "IX_GroupChatUser_FK_GroupChat",
                schema: "academicar",
                table: "GroupChatUser",
                column: "FK_GroupChat");

            migrationBuilder.CreateIndex(
                name: "IX_GroupChatUser_FK_User",
                schema: "academicar",
                table: "GroupChatUser",
                column: "FK_User");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMessage_FK_GroupChat",
                schema: "academicar",
                table: "GroupMessage",
                column: "FK_GroupChat");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMessage_FK_SenderUser",
                schema: "academicar",
                table: "GroupMessage",
                column: "FK_SenderUser");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalChat_FK_DriverUser",
                schema: "academicar",
                table: "PersonalChat",
                column: "FK_DriverUser");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalChat_FK_PassengerUser",
                schema: "academicar",
                table: "PersonalChat",
                column: "FK_PassengerUser");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalChat_FK_Trip",
                schema: "academicar",
                table: "PersonalChat",
                column: "FK_Trip");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalMessage_FK_PersonalChat",
                schema: "academicar",
                table: "PersonalMessage",
                column: "FK_PersonalChat");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalMessage_FK_SenderUser",
                schema: "academicar",
                table: "PersonalMessage",
                column: "FK_SenderUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupChatUser",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "GroupMessage",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "PersonalMessage",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "GroupChat",
                schema: "academicar");

            migrationBuilder.DropTable(
                name: "PersonalChat",
                schema: "academicar");

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
                    FK_Chat = table.Column<int>(type: "integer", nullable: false),
                    FK_TripRequest = table.Column<int>(type: "integer", nullable: false),
                    FK_User = table.Column<string>(type: "text", nullable: false),
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
    }
}
