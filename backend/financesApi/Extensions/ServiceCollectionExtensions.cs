using backend.financesApi.Repository;
using backend.financesApi.Services;

namespace backend.financesApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection RegisterAllServices(this IServiceCollection services)
    {
        services.AddScoped<ITransactionService, TransactionService>();

        return services;
    }

    public static IServiceCollection RegisterAllRepositories(this IServiceCollection services)
    {
        services.AddScoped<ITransactionRepository, TransactionRepository>();

        return services;
    }
}