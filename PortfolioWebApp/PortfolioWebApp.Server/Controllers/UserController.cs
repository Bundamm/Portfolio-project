using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO.User;
using PortfolioWebApp.Server.Repositories;
using PortfolioWebApp.Server.Mappers;
namespace PortfolioWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepo;

        public UserController(UserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user.ToUserDto());
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateUserDto userDto)
        {
            var user = await _userRepo.UpdateAsync(id, userDto.ToUserFromUpdateDto());
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.ToUserDto());
        }



    }
}
