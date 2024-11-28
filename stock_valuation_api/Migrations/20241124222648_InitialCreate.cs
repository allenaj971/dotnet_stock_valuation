using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StockValuationAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ticker = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DCFValuationModels",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StockId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Cashflows = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RateReturn = table.Column<float>(type: "real", nullable: true),
                    Growth = table.Column<float>(type: "real", nullable: true),
                    Years = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DCFValuationModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DCFValuationModels_Stocks_StockId",
                        column: x => x.StockId,
                        principalTable: "Stocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DDMValuationModels",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StockId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Dividend = table.Column<double>(type: "float", nullable: true),
                    RateReturn = table.Column<float>(type: "real", nullable: true),
                    Growth = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DDMValuationModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DDMValuationModels_Stocks_StockId",
                        column: x => x.StockId,
                        principalTable: "Stocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DCFValuationModels_StockId",
                table: "DCFValuationModels",
                column: "StockId");

            migrationBuilder.CreateIndex(
                name: "IX_DDMValuationModels_StockId",
                table: "DDMValuationModels",
                column: "StockId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DCFValuationModels");

            migrationBuilder.DropTable(
                name: "DDMValuationModels");

            migrationBuilder.DropTable(
                name: "Stocks");
        }
    }
}
