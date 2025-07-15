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
        _context.Pdfs.Add(pdf);
        await _context.SaveChangesAsync();
        return pdf;
    }
} 