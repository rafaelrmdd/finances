using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace financesApi.Migrations
{
    /// <inheritdoc />
    public partial class ChangeRowNameFromAmountToTargetAmountInSavingsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Savings",
                newName: "TargetAmount");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TargetAmount",
                table: "Savings",
                newName: "Amount");
        }
    }
}
