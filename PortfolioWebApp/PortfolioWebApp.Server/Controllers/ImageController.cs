using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class ImageController : ControllerBase
{
    private readonly ImageService _imageService;
    public ImageController(ImageService imageService)
    {
        _imageService = imageService;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] string filePath, [FromForm] int projectId)
    {
        if (string.IsNullOrWhiteSpace(filePath))
        { 
            return BadRequest("File path is empty."); }

        var fileName = Path.GetFileName(filePath);
        var uploadPath = Path.Combine("uploads", "images", fileName);

        if (!System.IO.File.Exists(filePath))
        {
            return BadRequest("File does not exist at the specified path."); 
        }

        if (System.IO.File.Exists(uploadPath))
        { 
            return Conflict("A file with the same name already exists in the uploads/images directory."); 
        }

        var image = await _imageService.UploadImageAsync(filePath, projectId);
        return Ok(MapToDto(image));
    }

    private static ImageDto MapToDto(Image image)
    {
        return new ImageDto
        {
            Id = image.ImageId,
            Path = image.ImagePath,
            ProjectId = image.ProjectId
        };
    }
} 