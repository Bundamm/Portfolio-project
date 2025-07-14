using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Services
{

    public class FileService
    {

        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public FileService(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<Image> UploadImageAsync(IFormFile file,int projectid)
        {
            if(file == null ||file.Length ==0)
                throw new ArgumentException("Incorrect File ");

            var uploadFolders = Path.Combine(_env.WebRootPath, "upload/images");
            Directory.CreateDirectory(uploadFolders);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadFolders, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var image = new Image
            {
                ProjectID = projectid,
                ImagePath = $"/uploads/images/{fileName}"
            };

            _context.Images.Add(image);
            await _context.SaveChangesAsync();
            return image;
        }

        public async Task<Pdf> UploadPdfAsync(IFormFile file, int projectId)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Nieprawidłowy plik.");

            var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads/pdfs");
            Directory.CreateDirectory(uploadsFolder);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var pdf = new Pdf
            {
                ProjectId = projectId,
                PdfName = file.FileName,
                PdfPath = $"/uploads/pdfs/{fileName}"
            };

            _context.Pdfs.Add(pdf);
            await _context.SaveChangesAsync();

            return pdf;
        }

    }
}
