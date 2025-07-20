using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Image;

namespace PortfolioWebApp.Server.Repositories
{
    public interface IImageRepository
    {
        Task<IEnumerable<Image>> GetAllAsync();
        Task<Image?> GetByIdAsync(int id);
        Task<Image> CreateAsync(Image imageModel);
        Task<Image?> UpdateAsync(int id, UpdateImageDto imageDto);
        Task<Image?> DeleteAsync(int id);
    }
}