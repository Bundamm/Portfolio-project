using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Repositories
{
    public class CategoryRepository
    {
        private readonly PortfolioWebAppContext _context;
        public CategoryRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Category> GetAll() => _context.Categories.Include(c => c.Projects).ToList();
        public Category? GetById(int id) => _context.Categories.Include(c => c.Projects).FirstOrDefault(c => c.CategoryId == id);
        public void Add(Category category) { _context.Categories.Add(category); _context.SaveChanges(); }
        public void Update(Category category) { _context.Categories.Update(category); _context.SaveChanges(); }
        public void Delete(int id) { var category = _context.Categories.Find(id); if (category != null) { _context.Categories.Remove(category); _context.SaveChanges(); } }
    }
}
