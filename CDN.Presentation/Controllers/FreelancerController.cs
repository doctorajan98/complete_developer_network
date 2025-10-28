using Microsoft.AspNetCore.Mvc;
using CDN.Core.Application.DTO;
using CDN.Core.Application.Interfaces;

namespace CDN.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FreelancerController : ControllerBase
    {
        private readonly IFreelancerService _freelancerService;

        public FreelancerController(IFreelancerService freelancerService)
        {
            _freelancerService = freelancerService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<FreelancerResponseDto>> Register(CreateFreelancerDto createDto)
        {
            try
            {
                var result = await _freelancerService.CreateAsync(createDto);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Update")]
        public async Task<ActionResult<FreelancerResponseDto>> Update(UpdateFreelancerDto updateDto)
        {
            var result = await _freelancerService.UpdateAsync(updateDto);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("Get")]
        public async Task<ActionResult<FreelancerResponseDto>> Get(int userId)
        {
            var result = await _freelancerService.GetByIdAsync(userId);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpDelete("Delete")]
        public async Task<ActionResult> Delete(int userId)
        {
            var result = await _freelancerService.DeleteAsync(userId);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("ListAll")]
        public async Task<ActionResult<IEnumerable<FreelancerResponseDto>>> ListAll()
        {
            var result = await _freelancerService.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("Search")]
        public async Task<ActionResult<IEnumerable<FreelancerResponseDto>>> Search(string searchQuery)
        {
            if (string.IsNullOrEmpty(searchQuery))
            {
                return BadRequest("Search query is required");
            }

            var results = await _freelancerService.SearchAsync(searchQuery);
            return Ok(results);
        }
    }
}