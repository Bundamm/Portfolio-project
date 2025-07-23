using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.DTO.User;

namespace PortfolioWebApp.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly PortfolioWebAppContext _context;
        public UserRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.users
                .Include(u => u.Projects)
                .ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.users.
                Include(u => u.Projects)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> CreateAsync(User userModel)
        {
            _context.users.Add(userModel);
            await _context.SaveChangesAsync();
            return userModel;
        }

        public async Task<User?> UpdateAsync(int id, UpdateUserDto userDto)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null) return null;
            user.Username = userDto.Username;
            user.PasswordHash = userDto.PasswordHash;
            user.Role = userDto.Role;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> DeleteAsync(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null) return null;
            _context.users.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
