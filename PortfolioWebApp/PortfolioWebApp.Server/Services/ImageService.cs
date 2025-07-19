using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;

public class ImageService
{
    private readonly PortfolioWebAppContext _context;
    public ImageService(PortfolioWebAppContext context) { _context = context; }
    public async Task<Image> UploadImageAsync(string filePath, int projectId)
    {
        if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
            throw new ArgumentException("Invalid file path");
        var fileName = Path.GetFileName(filePath);
        // Path to be determined when we're done with other stuff
        var image = new Image { ProjectId = projectId, ImagePath = $"/uploads/images/{fileName}" };
        _context.images.Add(image);
        await _context.SaveChangesAsync();
        return image;
    }

    public async Task<Image?> GetFileByIdAsync(int id)
    {
        return await _context.images
            .Include(p => p.Project)
            .FirstOrDefaultAsync(p => p.ImageId == id);
    }

    public async Task<List<Image>> GetAllImagesByIdAsync(int id)
    {
        return await _context.images
            .Include(p => p.Project)
            .OrderByDescending(p => p.ImageId)
            .ToListAsync();
    }

    public async Task<Image?> DeleteImageById(int id)
    {
        var image = await _context.images.FindAsync(id);
        if (image is null)
            throw new ArgumentNullException(nameof(image));
        _context.images.Remove(image);
        await _context.SaveChangesAsync();
        return image;
    }


} 