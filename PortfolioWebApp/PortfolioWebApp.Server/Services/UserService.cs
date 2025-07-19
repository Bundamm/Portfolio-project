using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Repositories;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.DTO;

namespace PortfolioWebApp.Server.Services
{
    public class UserService
    {
        private readonly PortfolioWebAppContext _context;

        public UserService(PortfolioWebAppContext context, UserRepository userRepository)
        {
            _context = context;
        }

        public async Task<User> CreateUserAsync(UserDto userDto)
        {
            if (string.IsNullOrEmpty(userDto.Username))
            {
                throw new ArgumentException("Username cannot be empty.", nameof(userDto.Username));
            }
            if (string.IsNullOrEmpty(userDto.Role)) {
                throw new ArgumentException("User role cannot be empty.", nameof(userDto.Role));
            }
            if (!(userDto.Role.Equals("admin", StringComparison.OrdinalIgnoreCase) || userDto.Role.Equals("root", StringComparison.OrdinalIgnoreCase)))
            {
                throw new ArgumentException("User role must be admin or root.");
            }
            var userCheck = await _context.users.FirstOrDefaultAsync(u => u.Username == userDto.Username);
            if (userCheck is not null)
            {
                throw new ArgumentException("User already exists");
            }
            User user = new User { Username = userDto.Username, PasswordHash = userDto.PasswordHash, Role = userDto.Role };
            await _context.users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserById(int userId)
        {
            var user = await _context.users.FindAsync(userId);
            if (user is null)
            {
                throw new ArgumentNullException("This user does not exist.");
            }
            return user;
        }

    }
}
