using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Pdf;

namespace PortfolioWebApp.Server.Repositories
{
    public interface IPdfRepository
    {
        Task<IEnumerable<Pdf>> GetAllAsync();
        Task<Pdf?> GetByIdAsync(int id);
        Task<Pdf> CreateAsync(Pdf documentModel);
        Task<Pdf?> UpdateAsync(int id, UpdatePdfDto documentDto);
        Task<Pdf?> DeleteAsync(int id);
    }
}