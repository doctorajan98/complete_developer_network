using Microsoft.EntityFrameworkCore;
using FreelancersAPI.Models;

namespace FreelancersAPI.Data
{
    public class APIContext : DbContext
    {
        public DbSet<Freelancers> FreelancerInfo { get; set; }

        public APIContext(DbContextOptions<APIContext> options) : base(options)
        {

        }

    }
}