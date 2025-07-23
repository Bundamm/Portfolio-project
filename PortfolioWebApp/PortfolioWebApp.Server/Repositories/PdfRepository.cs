using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.DTO.Pdf;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Repositories
{
    public class PdfRepository : IPdfRepository
    {
        private readonly PortfolioWebAppContext _context;

        public PdfRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public async Task<Pdf> CreateAsync(Pdf pdfModel)
        {
            var project = await _context.projects.FindAsync(pdfModel.ProjectId);
            if (project == null)
            {
                throw new Exception("The project by the id in the model doesnt exist.");
            }
            pdfModel.Project = project;
            await _context.pdfs.AddAsync(pdfModel);
            await _context.SaveChangesAsync();
            return pdfModel;
        }

        public async Task<Pdf?> DeleteAsync(int id)
        {
            var pdfModel = await _context.pdfs.FirstOrDefaultAsync(x => x.PdfId==id);
            if (pdfModel == null)
            {
                return null;
            }
            _context.pdfs.Remove(pdfModel);
            await _context.SaveChangesAsync();
            return pdfModel;
        }

        public async Task<IEnumerable<Pdf>> GetAllAsync()
        {
            return await _context.pdfs.ToListAsync();
        }

        public async Task<Pdf?> GetByIdAsync(int id)
        {
            return await _context.pdfs.FindAsync(id);
        }

        public async Task<Pdf?> UpdateAsync(int id, UpdatePdfDto pdfDto)
        {
            var existingPdf = await _context.pdfs.FirstOrDefaultAsync(x => x.PdfId == id);
            if (existingPdf == null)
            {
                return null;
            }
            existingPdf.PdfPath = pdfDto.Path;
            existingPdf.PdfName = pdfDto.Name;
            await _context.SaveChangesAsync();
            return existingPdf;


        }
    }
}
