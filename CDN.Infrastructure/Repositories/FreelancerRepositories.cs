using Microsoft.EntityFrameworkCore;
using CDN.Core.Domain.Entities;
using CDN.Core.Domain.Interfaces;
using CDN.Infrastructure.Data;

namespace CDN.Infrastructure.Repositories
{
    public class FreelancerRepository : IFreelancerRepository
    {
        private readonly CDNDbContext _context;

        public FreelancerRepository(CDNDbContext context)
        {
            _context = context;
        }

        public async Task<Freelancer?> GetByIdAsync(int userId)
        {
            return await _context.Freelancers.FindAsync(userId);
        }

        public async Task<IEnumerable<Freelancer>> GetAllAsync()
        {
            return await _context.Freelancers
                .Where(f => !f.IsArchived)
                .ToListAsync();
        }

        public async Task<IEnumerable<Freelancer>> GetAllIncludingArchivedAsync()
        {
            return await _context.Freelancers.ToListAsync();
        }

        public async Task<IEnumerable<Freelancer>> SearchAsync(string searchQuery)
        {
            if (string.IsNullOrEmpty(searchQuery))
            {
                return new List<Freelancer>();
            }

            return await _context.Freelancers
                .Where(f => !f.IsArchived &&
                           (f.UserName.Contains(searchQuery) ||
                            f.Name.Contains(searchQuery) ||
                            (f.Email != null && f.Email.Contains(searchQuery))))
                .ToListAsync();
        }

        public async Task<Freelancer> CreateAsync(Freelancer freelancer)
        {
            _context.Freelancers.Add(freelancer);
            await _context.SaveChangesAsync();
            return freelancer;
        }

        public async Task<Freelancer?> UpdateAsync(Freelancer freelancer)
        {
            var existingFreelancer = await _context.Freelancers.FindAsync(freelancer.UserId);
            if (existingFreelancer == null)
            {
                return null;
            }

            _context.Entry(existingFreelancer).CurrentValues.SetValues(freelancer);
            await _context.SaveChangesAsync();
            return existingFreelancer;
        }

        public async Task<bool> DeleteAsync(int userId)
        {
            var freelancer = await _context.Freelancers.FindAsync(userId);
            if (freelancer == null)
            {
                return false;
            }

            _context.Freelancers.Remove(freelancer);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }

            return await _context.Freelancers.AnyAsync(f => f.Email == email);
        }

        public async Task<bool> ArchiveAsync(int userId)
        {
            var freelancer = await _context.Freelancers.FindAsync(userId);
            if (freelancer == null)
            {
                return false;
            }

            freelancer.IsArchived = true;
            freelancer.ArchivedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UnarchiveAsync(int userId)
        {
            var freelancer = await _context.Freelancers.FindAsync(userId);
            if (freelancer == null)
            {
                return false;
            }

            freelancer.IsArchived = false;
            freelancer.ArchivedAt = null;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleArchiveStatusAsync(int userId)
        {
            var freelancer = await _context.Freelancers.FindAsync(userId);
            if (freelancer == null)
            {
                return false;
            }

            freelancer.IsArchived = !freelancer.IsArchived;
            freelancer.ArchivedAt = freelancer.IsArchived ? DateTime.UtcNow : null;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}