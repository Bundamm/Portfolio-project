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
        var image = new Image { ProjectId = projectId, ImagePath = $"/uploads/images/{fileName}" };
        _context.Images.Add(image);
        await _context.SaveChangesAsync();
        return image;
    }
} 