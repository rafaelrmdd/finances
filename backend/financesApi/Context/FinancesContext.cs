using backend.financesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.financesApi.Context;

public class FinancesContext : DbContext
{
    public readonly IConfiguration _configuration;
    public FinancesContext(IConfiguration configuration, DbContextOptions options) : base(options)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql(_configuration["ConnectionStrings:NpgsqlConnectionString"]);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TransactionItem>()
            .Property(e => e.Type)
            .HasConversion<string>();

        modelBuilder.Entity<TransactionItem>()
            .Property(e => e.Category)
            .HasConversion<string>();
    }

    public DbSet<TransactionItem> Transactions { get; set; }
}