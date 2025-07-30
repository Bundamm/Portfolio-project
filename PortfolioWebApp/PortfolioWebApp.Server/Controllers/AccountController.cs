using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.DTO.Account;
using PortfolioWebApp.Server.Interfaces;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signIn)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signIn;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        errors = ModelState
                            .Where(e => e.Value?.Errors.Count > 0)
                            .ToDictionary(
                                kvp => kvp.Key,
                                kvp => kvp.Value!.Errors.Select(err => err.ErrorMessage).ToArray()
                            )
                    });
                }

                var appUser = new User
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "Admin");
                    if (roleResult.Succeeded)
                    {
                        return Ok(new NewUserDto
                        {
                            UserName = appUser.UserName,
                            Email = appUser.Email,
                            Token = _tokenService.CreateToken(appUser)
                        });
                    }
                    else
                    {
                        return StatusCode(500, new
                        {
                            errors = roleResult.Errors.Select(e => e.Description)
                        });
                    }
                }
                else
                {
                    return StatusCode(500, new
                    {
                        errors = createdUser.Errors.Select(e => e.Description)
                    });
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, new
                {
                    error = "Server error",
                    message = e.Message
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    errors = ModelState
                        .Where(e => e.Value?.Errors.Count > 0)
                        .ToDictionary(
                            kvp => kvp.Key,
                            kvp => kvp.Value!.Errors.Select(err => err.ErrorMessage).ToArray()
                        )
                });
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null)
            {
                return Unauthorized(new { error = "Invalid username" });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized(new { error = "Username not found and/or password incorrect" });
            }

            return Ok(new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            });
        }
    }
}
