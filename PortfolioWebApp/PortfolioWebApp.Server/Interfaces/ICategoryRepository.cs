using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Category;

namespace PortfolioWebApp.Server.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task<Category> CreateAsync(Category categoryModel);
        Task<Category?> UpdateAsync(int id, UpdateCategoryDto categoryDto);
        Task<Category?> DeleteAsync(int id);
        Task<bool> CategoryExists(int id);
    }
}
