using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.DTO.Category;

namespace PortfolioWebApp.Server.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly PortfolioWebAppContext _context;
        public CategoryRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _context.categories.Include(c => c.Projects).ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await _context.categories.Include(c => c.Projects).FirstOrDefaultAsync(c => c.CategoryId == id);
        }

        public async Task<Category> CreateAsync(Category categoryModel)
        {
            _context.categories.Add(categoryModel);
            await _context.SaveChangesAsync();
            return categoryModel;
        }

        public async Task<Category> UpdateAsync(int id, UpdateCategoryDto categoryDto)
        {
            var category = await _context.categories.FindAsync(id);
            if (category == null) return null;
            category.CategoryName = categoryDto.CategoryName;
            category.Description = categoryDto.Description;
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _context.categories.FindAsync(id);
            if (category != null)
            {
                _context.categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }
    }
}
