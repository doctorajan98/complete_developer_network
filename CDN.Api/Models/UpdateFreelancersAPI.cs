using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreelancersAPI.Models
{
    public class Freelancers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int userId { get; set; }

        [Required]
        public string userName { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }

        public List<String> skillSet { get; set; }
        public List<String> hobbies { get; set; }
    }
}