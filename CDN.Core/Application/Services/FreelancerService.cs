using CDN.Core.Application.DTOs;
using CDN.Core.Application.Interfaces;
using CDN.Core.Domain.Entities;
using CDN.Core.Domain.Interfaces;

namespace CDN.Core.Application.Services
{
    public class FreelancerService : IFreelancerService
    {
        private readonly IFreelancerRepository _freelancerRepository;

        public FreelancerService(IFreelancerRepository freelancerRepository)
        {
            _freelancerRepository = freelancerRepository;
        }

        public async Task<FreelancerResponseDto?> GetByIdAsync(int userId)
        {
            var freelancer = await _freelancerRepository.GetByIdAsync(userId);
            return freelancer != null ? MaptoResponseDto(freelancer) : null;
        }

        public async Task<IEnumerable<FreelancerResponseDto>> GetAllAsync()
        {
            var freelancers = await _freelancerRepository.GetAllAsync();
            return freelancers.Select(MaptoResponseDto);
        }

        public async Task<IEnumerable<FreelancerResponseDto>> SearchAsync(string searchQuery)
        {
            var freelancers = await _freelancerRepository.SearchAsync(searchQuery);
            return freelancers.Select(MapToResponseDto);
        }

        public async Task<FreelancerResponseDto> CreateAsync(CreateFreelancerDto createDto)
        {
            // Check if email already exists
            if (!string.IsNullOrEmpty(createDto.Email) &&
                await _freelancerRepository.ExistsByEmailAsync(createDto.Email))
            {
                throw new InvalidOperationException("Email already exists");
            }

            var freelancer = new Freelancer
            {
                UserName = createDto.UserName,
                Name = createDto.Name,
                Email = createDto.Email,
                PhoneNumber = createDto.PhoneNumber,
                SkillSet = createDto.SkillSet,
                Hobbies = createDto.Hobbies
            }
            var createdFreelancer = await _freelancerRepository.CreateAsync(freelancer);
            return MaptoResponseDto(createdFreelancer);
        }

        public async Task<FreelancerResponseDto?> UpdateAsync(UpdateFreelancerDto updateDto)
        {
            var existingFreelancer = await _freelancerRepository.GetByIdAsync(updateDto.UserId);
            if (existingFreelancer == null)
            {
                return null;
            }

            existingFreelancer.UserName = updateDto.UserName;
            existingFreelancer.Name = updateDto.Name;
            existingFreelancer.PhoneNumber = updateDto.PhoneNumber;
            existingFreelancer.Email = updateDto.Email;
            existingFreelancer.SkillSet = updateDto.SkillSet;
            existingFreelancer.Hobbies = updateDto.Hobbies;

            var updatedFreelancer = await _freelancerRepository.UpdateAsync(existingFreelancer);
            return updatedFreelancer != null ? MapToResponseDto(updatedFreelancer) : null;
        }

        public async Task<bool> DeleteAsync(int userId)
        {
            return await _freelancerRepository.DeleteAsync(userId);
        }

        private static FreelancerResponseDto MapToResponseDto(Freelancer freelancer)
        {
            return new FreelancerResponseDto
            {
                UserId = freelancer.UserId,
                UserName = freelancer.UserName,
                Name = freelancer.Name,
                PhoneNumber = freelancer.PhoneNumber,
                Email = freelancer.Email,
                SkillSet = freelancer.SkillSet,
                Hobbies = freelancer.Hobbies
            };
        }
    }
}