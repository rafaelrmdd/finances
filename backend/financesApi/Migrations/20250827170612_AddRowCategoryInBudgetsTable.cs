using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace financesApi.Migrations
{
    /// <inheritdoc />
    public partial class AddRowCategoryInBudgetsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Budgets",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Budgets");
        }
    }
}
