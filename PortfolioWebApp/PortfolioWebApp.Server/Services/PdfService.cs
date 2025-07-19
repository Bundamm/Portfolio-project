using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;

public class PdfService
{
    private readonly PortfolioWebAppContext _context;
    public PdfService(PortfolioWebAppContext context) { _context = context; }
    public async Task<Pdf> UploadPdfAsync(string filePath, int projectId)
    {
        if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
            throw new ArgumentException("Invalid file path");
        var fileName = Path.GetFileName(filePath);
        var pdf = new Pdf { ProjectId = projectId, PdfName = fileName, PdfPath = $"/uploads/pdfs/{fileName}" };
        _context.pdfs.Add(pdf);
        await _context.SaveChangesAsync();
        return pdf;
    }

    public async Task<Pdf?> GetPdfByIdAsync(int id)
    {
        return await _context.pdfs
            .Include(p => p.Project)
            .FirstOrDefaultAsync(p => p.PdfId == id);
    }

    public async Task<List<Pdf>> GetAllPdfsByIdAsync(int id)
    {
        return await _context.pdfs
            .Include(p => p.Project)
            .OrderByDescending(p => p.PdfId)
            .ToListAsync();
    }

    public async Task<Pdf?> DeletePdfById(int id)
    {
        var pdf = await _context.pdfs.FindAsync(id);
        if (pdf is null)
            throw new ArgumentNullException(nameof(pdf));
        _context.pdfs.Remove(pdf);
        await _context.SaveChangesAsync();
        return pdf;
    }


} 