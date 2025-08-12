using System.Reflection;
using backend.financesApi.Context;
using Microsoft.EntityFrameworkCore;
using backend.financesApi.Extensions;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Finance REST Api",
        Version = "v1",
        Description = "REST API for a finance application"
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});
builder.Services.RegisterAllServices();
builder.Services.RegisterAllRepositories();
builder.Services.AddDbContext<FinancesContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("ConnectionStrings:NpgsqlConnectionString"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalHost",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:3000", "https://localhost:3000, https://localhost:5185")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.DefaultModelsExpandDepth(-1);
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowLocalHost");
app.UseAuthorization();
app.MapControllers();

app.Run();
