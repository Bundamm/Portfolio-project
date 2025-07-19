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