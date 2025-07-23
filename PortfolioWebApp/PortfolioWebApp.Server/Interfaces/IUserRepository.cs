using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.User;

namespace PortfolioWebApp.Server.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(int id);
        Task<User?> UpdateAsync(int id, User userModel);

    }
}
