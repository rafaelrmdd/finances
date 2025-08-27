using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace financesApi.Migrations
{
    /// <inheritdoc />
    public partial class AddNewRowsStartDateEndDateAndChangedRowValueToAmountInBudgetsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Spent",
                table: "Budgets",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "BudgetValue",
                table: "Budgets",
                newName: "EndDate");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Budgets",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "Amount",
                table: "Budgets",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Budgets");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Budgets",
                newName: "Spent");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Budgets",
                newName: "BudgetValue");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Budgets",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
