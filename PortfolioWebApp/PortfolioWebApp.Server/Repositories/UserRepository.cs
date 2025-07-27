using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly PortfolioWebAppContext _context;
        public UserRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.
                Include(u => u.Projects)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> UpdateAsync(int id, User userModel)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;
            user.Username = userModel.Username;
            user.PasswordHash = userModel.PasswordHash;
            user.Role = userModel.Role;
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
