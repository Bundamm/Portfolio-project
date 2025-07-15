using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Repositories
{
    public class UserRepository
    {
        private readonly PortfolioWebAppContext _context;
        public UserRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAll() => _context.Users.Include(u => u.Projects).ToList();
        public User? GetById(int id) => _context.Users.Include(u => u.Projects).FirstOrDefault(u => u.Id == id);
        public void Add(User user) { _context.Users.Add(user); _context.SaveChanges(); }
        public void Update(User user) { _context.Users.Update(user); _context.SaveChanges(); }
        public void Delete(int id) { var user = _context.Users.Find(id); if (user != null) { _context.Users.Remove(user); _context.SaveChanges(); } }
    }
}
