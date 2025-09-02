using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace financesApi.Migrations
{
    /// <inheritdoc />
    public partial class AddNewRowCurrentAmountAtSavingsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrentAmount",
                table: "Savings",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentAmount",
                table: "Savings");
        }
    }
}
