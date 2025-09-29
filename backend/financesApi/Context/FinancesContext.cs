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

        modelBuilder.Entity<TransactionItem>()
            .HasOne(t => t.User)
            .WithMany(u => u.Transactions)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Budget>()
            .HasOne(b => b.User)
            .WithMany(u => u.Budgets)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Saving>()
            .HasOne(s => s.User)
            .WithMany(u => u.Savings)
            .HasForeignKey(s => s.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    public DbSet<TransactionItem> Transactions { get; set; }
    public DbSet<Budget> Budgets { get; set; }
    public DbSet<Saving> Savings { get; set; }
    public DbSet<User> Users { get; set; }
}