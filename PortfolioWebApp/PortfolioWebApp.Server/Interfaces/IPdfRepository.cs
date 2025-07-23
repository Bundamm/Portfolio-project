using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Pdf;

namespace PortfolioWebApp.Server.Repositories
{
    public interface IPdfRepository
    {
        Task<IEnumerable<Pdf>> GetAllAsync();
        Task<Pdf?> GetByIdAsync(int id);
        Task<Pdf> CreateAsync(Pdf pdfModel);
        Task<Pdf?> UpdateAsync(int id, UpdatePdfDto pdfModel);
        Task<Pdf?> DeleteAsync(int id);
    }
}
