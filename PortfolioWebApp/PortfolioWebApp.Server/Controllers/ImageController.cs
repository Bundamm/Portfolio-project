using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO.Image;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Repositories;

[ApiController]
[Route("api/image")]
public class ImageController : ControllerBase
{
    private readonly ImageRepository _imageRepo;
    public ImageController(ImageRepository imageRepository)
    {
        _imageRepo = imageRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var images = await _imageRepo.GetAllAsync();
        var imageDto = images.Select(i => i.ToImageDto());
        return Ok(images);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var image = await _imageRepo.GetByIdAsync(id);
        if (image == null)
        {
            return NotFound();
        }
        return Ok(image.ToImageDto());
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateImageDto imageDto)
    {
        var imageModel = imageDto.ToImageFromCreateImageDto();
        await _imageRepo.CreateAsync(imageModel);
        return CreatedAtAction(nameof(GetById), new { id = imageModel.ImageId }, imageModel.ToImageDto());
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody]  UpdateImageDto imageDto)
    {
        var imageModel = await _imageRepo.UpdateAsync(id, imageDto);
        if(imageModel == null)
        {
            return NotFound();
        }
        return Ok(imageModel.ToImageDto());
    }
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var imageModel = await _imageRepo.DeleteAsync(id);

        if (imageModel == null)
        {
            return NotFound();
        }
        return NoContent();
    }
} 