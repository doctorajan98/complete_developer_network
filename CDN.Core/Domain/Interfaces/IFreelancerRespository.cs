using CDN.Core.Domain.Entities;

namespace CDN.Core.Domain.Interfaces
{
    public interface IFreelancerRepository
    {
        Task<Freelancer?> GetByIdAsync(int userId);
        Task<IEnumerable<Freelancer>> GetAllAsync();
        Task<IEnumerable<Freelancer>> GetAllIncludingArchivedAsync();
        Task<IEnumerable<Freelancer>> SearchAsync(string searchQuery);
        Task<Freelancer> CreateAsync(Freelancer freelancer);
        Task<Freelancer?> UpdateAsync(Freelancer freelancer);
        Task<bool> DeleteAsync(int userId);
        Task<bool> ExistsByEmailAsync(string email);
        Task<bool> ArchiveAsync(int userId);
        Task<bool> UnarchiveAsync(int userId);
        Task<bool> ToggleArchiveStatusAsync(int userId);
    }
}