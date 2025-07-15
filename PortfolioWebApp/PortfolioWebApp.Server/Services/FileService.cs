using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Services
{

    public class FileService
    {

        private readonly PortfolioWebAppContext _context;
        private readonly IWebHostEnvironment _env;

        public FileService(PortfolioWebAppContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<Image> UploadImageAsync(string filePath, int projectId)
        {
            if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
                throw new ArgumentException("Invalid file path");

            var fileName = Path.GetFileName(filePath);
            var image = new Image
            {
                ProjectId = projectId,
                ImagePath = $"/uploads/images/{fileName}"
            };

            _context.Images.Add(image);
            await _context.SaveChangesAsync();
            return image;
        }

        public async Task<Pdf> UploadPdfAsync(string filePath, int projectId)
        {
            if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
                throw new ArgumentException("Invalid file path");

            var fileName = Path.GetFileName(filePath);
            var pdf = new Pdf
            {
                ProjectId = projectId,
                PdfName = fileName,
                PdfPath = $"/uploads/pdfs/{fileName}"
            };

            _context.Pdfs.Add(pdf);
            await _context.SaveChangesAsync();
            return pdf;
        }

    }
}
