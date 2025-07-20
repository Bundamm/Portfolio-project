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

        public IEnumerable<User> GetAll() => _context.users.Include(u => u.Projects).ToList();
        public User? GetById(int id) => _context.users.Include(u => u.Projects).FirstOrDefault(u => u.Id == id);
        public void Add(User user) { _context.users.Add(user); _context.SaveChanges(); }
        public void Update(User user) { _context.users.Update(user); _context.SaveChanges(); }
        public void Delete(int id) { var user = _context.users.Find(id); if (user != null) { _context.users.Remove(user); _context.SaveChanges(); } }
    }
}
