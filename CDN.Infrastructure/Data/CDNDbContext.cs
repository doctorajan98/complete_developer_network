using Microsoft.EntityFrameworkCore;
using CDN.Core.Domain.Entities;

namespace CDN.Infrastructure.Data
{
    public class CDNDbContext : DbContext
    {
        public DbSet<Freelancer> Freelancers { get; set; }

        public CDNDbContext(DbContextOptions<CDNDbContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Freelancer>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.UserName).IsRequired();
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Email).HasMaxLength(255);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);

                // TODO: Remove listing when converting skills and hobbies to each seperate entities
                entity.Property(e => e.SkillSet)
                    .HasConversion(
                        v => System.Text.Json.JsonSerializer.Serialize(v,
                        (System.Text.Json.JsonSerializerOptions?)null),
                        v => System.Text.Json.JsonSerializer.Deserialize<List<string>>(v,
                        (System.Text.Json.JsonSerializerOptions?)null) ?? new List<string>()
                    );

                entity.Property(e => e.Hobbies)
                    .HasConversion(
                        v => System.Text.Json.JsonSerializer.Serialize(v,
                        (System.Text.Json.JsonSerializerOptions?)null),
                        v => System.Text.Json.JsonSerializer.Deserialize<List<string>>(v,
                        (System.Text.Json.JsonSerializerOptions?)null) ?? new List<string>()
                    );
            });
        }
    }
}