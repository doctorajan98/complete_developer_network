using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FreelancersAPI.Data;
using FreelancersAPI.Models;

namespace FreelancersAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FreelancerUpdateController : ControllerBase
    {
        private readonly APIContext _context;

        public FreelancerUpdateController(APIContext context)
        {
            _context = context;
        }

        //register/delete/update/get/list
        [HttpPost("Register")]
        public JsonResult Register(Freelancers freelancer)
        {
            if (freelancer.userId == 0)
            {
                // Check if user email already exists
                if (_context.FreelancerInfo.Any(f => f.email == freelancer.email))
                {
                    return new JsonResult(BadRequest("Email already exists"));
                }
                else
                {
                    _context.FreelancerInfo.Add(freelancer);
                }
            }
            _context.SaveChanges();
            return new JsonResult(Ok(freelancer));
        }

        [HttpPut("Update")]
        public JsonResult Update(Freelancers freelancer)
        {
            var result = _context.FreelancerInfo.Find(freelancer.userId);
            if (result == null)
            {
                return new JsonResult(NotFound());
            }
            else
            {
                result.userName = freelancer.userName;
                result.phoneNumber = freelancer.phoneNumber;
                result.email = freelancer.email;
                result.skillSet = freelancer.skillSet;
                result.hobbies = freelancer.hobbies;
            }
            _context.SaveChanges();
            return new JsonResult(Ok(result));
        }

        [HttpGet("Get")]
        public JsonResult Get(int userId)
        {
            var result = _context.FreelancerInfo.Find(userId);
            if (result == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(result));
        }

        [HttpDelete("Delete")]
        public JsonResult Delete(int userId)
        {
            var result = _context.FreelancerInfo.Find(userId);
            if (result == null)
            {
                return new JsonResult(NotFound());
            }
            else
            {
                _context.FreelancerInfo.Remove(result);
                _context.SaveChanges();
                return new JsonResult(NoContent());
            }
        }

        [HttpGet("ListAll")]
        public JsonResult ListAll()
        {
            var result = _context.FreelancerInfo.ToList();
            return new JsonResult(Ok(result));
        }

        [HttpGet("Search")]
        public JsonResult Search(string searchQuery)
        {
            if (string.IsNullOrEmpty(searchQuery))
            {
                return new JsonResult(BadRequest("Search query is required"));
            }

            var results = _context.FreelancerInfo
                .Where(f =>
                    f.userName.Contains(searchQuery) ||
                    f.email.Contains(searchQuery))
                .ToList();

            if (results == null)
            {
                return new JsonResult(NotFound());
            }

            return new JsonResult(Ok(results));
        }
    }
}