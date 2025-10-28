using System.ComponentModel.DataAnnotations;

namespace CDN.Core.Application.DTO
{
    public class CreateFreelancerDto
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }

        public List<string> SkillSet { get; set; } = new();

        public List<string> Hobbies { get; set; } = new();
    }

    public class UpdateFreelancerDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string UserName { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }

        public List<string> SkillSet { get; set; } = new();

        public List<string> Hobbies { get; set; } = new();
    }

    public class FreelancerResponseDto
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public List<string> SkillSet { get; set; } = new();
        public List<string> Hobbies { get; set; } = new();
    }

    public class SearchFreelancerDto
    {
        [Required]
        public string SearchQuery { get; set; } = string.Empty;
    }
}