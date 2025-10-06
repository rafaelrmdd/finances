using System.Reflection;
using backend.financesApi.Context;
using Microsoft.EntityFrameworkCore;
using backend.financesApi.Extensions;
using Microsoft.OpenApi.Models;
using backend.financesApi.Profiles;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

var secret = builder.Configuration["NextAuthSecret"];

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
            ClockSkew = TimeSpan.Zero,
            RequireExpirationTime = false,
            ValidateTokenReplay = false
        };

        // options.Events = new JwtBearerEvents
        // {
        //     OnAuthenticationFailed = context =>
        //     {
        //         Console.WriteLine($"Authentication failed: {context.Exception.Message}");
        //         return Task.CompletedTask;
        //     },
        //     OnTokenValidated = context =>
        //     {
        //         Console.WriteLine("Token validated successfully");
        //         var claims = context.Principal.Claims.Select(c => $"{c.Type}: {c.Value}");
        //         Console.WriteLine($"Claims: {string.Join(", ", claims)}");
        //         return Task.CompletedTask;
        //     },
        //     OnChallenge = context =>
        //     {
        //         Console.WriteLine($"OnChallenge: {context.Error}, {context.ErrorDescription}");
        //         return Task.CompletedTask;
        //     }
        // };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(
    typeof(BudgetProfile),
    typeof(TransactionProfile),
    typeof(SavingProfile),
    typeof(UserProfile)
);
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
                .AllowAnyMethod()
                .AllowCredentials();
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

app.UseCors("AllowLocalHost");
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
