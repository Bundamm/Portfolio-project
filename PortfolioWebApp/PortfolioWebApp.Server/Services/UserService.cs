using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Repositories;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Services
{
    public class UserService
    {
        private readonly PortfolioWebAppContext _context;

        public UserService(PortfolioWebAppContext context, UserRepository userRepository)
        {
            _context = context;
        }

        public async Task<User> CreateUserAsync(string userName, string password, string userRole)
        {
            if (string.IsNullOrEmpty(userName))
            {
                throw new ArgumentException("Username cannot be empty.", nameof(userName));
            }
            if (string.IsNullOrEmpty(userRole)) {
                throw new ArgumentException("User role cannot be empty.", nameof(userRole));
            }
            if (!(userRole.Equals("admin", StringComparison.OrdinalIgnoreCase) || userRole.Equals("root", StringComparison.OrdinalIgnoreCase)))
            {
                throw new ArgumentException("User role must be admin or root.");
            }
            var userCheck = await _context.Users.FirstOrDefaultAsync(u => u.Username == userName);
            if (userCheck is not null)
            {
                throw new ArgumentException("User already exists");
            }
            User user = new User { Username = userName, PasswordHash = password, Role = userRole };
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserById(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user is null)
            {
                throw new ArgumentNullException("This user does not exist.");
            }
            return user;
        }

    }
}
