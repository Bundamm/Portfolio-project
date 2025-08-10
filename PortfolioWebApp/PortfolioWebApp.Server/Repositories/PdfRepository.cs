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
            var project = await _context.Projects.FindAsync(pdfModel.ProjectId);
            if (project == null)
            {
                throw new Exception("The project by the id in the model doesnt exist.");
            }
            
            // Sprawdź czy PDF o tej nazwie już istnieje w projekcie
            var existingPdf = await _context.Pdfs
                .FirstOrDefaultAsync(x => x.ProjectId == pdfModel.ProjectId && 
                                        x.PdfName == pdfModel.PdfName);
            
            if (existingPdf != null)
            {
                throw new Exception($"PDF with name '{pdfModel.PdfName}' already exists in this project.");
            }
            
            pdfModel.Project = project;
            await _context.Pdfs.AddAsync(pdfModel);
            await _context.SaveChangesAsync();
            return pdfModel;
        }

        public async Task<Pdf?> DeleteAsync(int id)
        {
            var pdfModel = await _context.Pdfs.FirstOrDefaultAsync(x => x.PdfId==id);
            if (pdfModel == null)
            {
                return null;
            }
            _context.Pdfs.Remove(pdfModel);
            await _context.SaveChangesAsync();
            return pdfModel;
        }

        public async Task<IEnumerable<Pdf>> GetAllAsync()
        {
            return await _context.Pdfs.ToListAsync();
        }

        public async Task<Pdf?> GetByIdAsync(int id)
        {
            return await _context.Pdfs.FindAsync(id);
        }

        public async Task<Pdf?> UpdateAsync(int id, Pdf pdfModel)
        {
            var existingPdf = await _context.Pdfs.FirstOrDefaultAsync(x => x.PdfId == id);
            if (existingPdf == null)
            {
                return null;
            }
            existingPdf.PdfPath = pdfModel.PdfPath;
            existingPdf.PdfName = pdfModel.PdfName;
            await _context.SaveChangesAsync();
            return existingPdf;


        }
    }
}
