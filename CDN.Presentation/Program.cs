using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.OpenApi.Models;
using CDN.Core.Application.Interfaces;
using CDN.Core.Application.Services;
using CDN.Core.Domain.Interfaces;
using CDN.Infrastructure.Data;
using CDN.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Database Configuration
builder.Services.AddDbContext<CDNDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 43))));

// Repository Registration
builder.Services.AddScoped<IFreelancerRepository, FreelancerRepository>();

// Service Registration
builder.Services.AddScoped<IFreelancerService, FreelancerService>();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000", "http://localhost:3001", "https://localhost:3001") // React app URLs
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Swagger Configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CDN Freelancers API",
        Version = "v1",
        Description = "Clean Architecture API for managing freelancer information"
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowReactApp");

app.MapControllers();

app.Run();