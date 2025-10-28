using CDN.Core.Application.DTO;

namespace CDN.Core.Application.Interfaces
{
    public interface IFreelancerService
    {
        Task<FreelancerResponseDto?> GetByIdAsync(int userId);
        Task<IEnumerable<FreelancerResponseDto>> GetAllAsync();
        Task<IEnumerable<FreelancerResponseDto>> SearchAsync(string searchQuery);
        Task<FreelancerResponseDto> CreateAsync(CreateFreelancerDto createDto);
        Task<FreelancerResponseDto?> UpdateAsync(UpdateFreelancerDto updateDto);
        Task<bool> DeleteAsync(int userId);
    }
}