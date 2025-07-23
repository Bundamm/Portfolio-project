using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.User;

namespace PortfolioWebApp.Server.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User> CreateAsync(User userModel);
        Task<User?> UpdateAsync(int id, UpdateUserDto userDto);
        Task<User?> DeleteAsync(int id);

    }
}
