using Microsoft.EntityFrameworkCore;

class FinancesContext : DbContext
{

    public FinancesContext(DbContextOptions options) : base(options)
    {

    }
}