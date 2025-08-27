using backend.financesApi.Models;
using backend.financesApi.Repository;
using backend.financesApi.Services;

namespace backend.financesApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection RegisterAllServices(this IServiceCollection services)
    {
        services.AddScoped<ITransactionService, TransactionService>();
        services.AddScoped<IBudgetService, BudgetService>();

        return services;
    }

    public static IServiceCollection RegisterAllRepositories(this IServiceCollection services)
    {
        services.AddScoped<ITransactionRepository, TransactionRepository>();
        services.AddScoped<IBudgetRepository, BudgetRepository>();

        return services;
    }
}