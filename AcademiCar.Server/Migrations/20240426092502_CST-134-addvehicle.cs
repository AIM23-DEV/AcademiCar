using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AcademiCar.Server.Migrations
{
    /// <inheritdoc />
    public partial class CST134addvehicle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vehicle",
                schema: "academicar",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Seats = table.Column<int>(type: "integer", nullable: false),
                    Color = table.Column<string>(type: "text", nullable: false),
                    Picture = table.Column<byte[]>(type: "bytea", nullable: false),
                    Features = table.Column<string>(type: "text", nullable: false),
                    IsElectric = table.Column<bool>(type: "boolean", nullable: false),
                    FK_User = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Vehicle_User_FK_User",
                        column: x => x.FK_User,
                        principalSchema: "academicar",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vehicle_FK_User",
                schema: "academicar",
                table: "Vehicle",
                column: "FK_User");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vehicle",
                schema: "academicar");
        }
    }
}
