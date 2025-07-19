using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.Services;
using PortfolioWebApp.Server.Models;
namespace PortfolioWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly PortfolioWebAppContext _context;

        public UserController(UserService userService, PortfolioWebAppContext userContext)
        {
            _userService = userService;
            _context = userContext;
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(int userId)
        {
            var user = await _userService.GetUserById(userId);
            if(user == null) 
                return NotFound();
            return Ok(user);
        }


        [HttpPost]
        public async Task<IActionResult> Create(UserDto userDto)
        {
            try
            {
                var user = await _userService.CreateUserAsync(userDto);
                return CreatedAtAction(nameof(Create), MapToDto(user));
            }
            catch (Exception ex)
            {
                return Forbid(ex.Message);
            }

        }

        private static UserDto MapToDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                PasswordHash = user.PasswordHash,
                Role = user.Role,
                ProjectIds = user.Projects.Select(p => p.ProjectId).ToList() ?? new List<int>()
            };
        }

    }
}
