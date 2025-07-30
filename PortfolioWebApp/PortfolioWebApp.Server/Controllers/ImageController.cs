using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO.Image;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Repositories;

[ApiController]
[Route("api/image")]
public class ImageController : ControllerBase
{
    private readonly ImageRepository _imageRepo;
    private readonly ProjectRepository _projectRepo;
    public ImageController(ImageRepository imageRepository, ProjectRepository projectRepo)
    {
        _imageRepo = imageRepository;
        _projectRepo = projectRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var images = await _imageRepo.GetAllAsync();
        var imageDto = images.Select(i => i.ToImageDto());
        return Ok(imageDto);
    }
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var image = await _imageRepo.GetByIdAsync(id);
        if (image == null)
        {
            return NotFound();
        }
        return Ok(image.ToImageDto());
    }

    [HttpPost("{projectId:int}")]
    [Authorize]
    public async Task<IActionResult> Create([FromRoute] int projectId, [FromBody] CreateImageDto imageDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (!await _projectRepo.ProjectExists(projectId)) 
        {
            return NotFound("Project does not exist.");
        }
        var imageModel = imageDto.ToImageFromCreateImageDto(projectId);
        await _imageRepo.CreateAsync(imageModel);
        return CreatedAtAction(nameof(GetById), new { id = imageModel.ImageId }, imageModel.ToImageDto());
    }

    [HttpPut]
    [Route("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody]  UpdateImageDto imageDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var imageModel = await _imageRepo.UpdateAsync(id, imageDto.ToImageFromUpdateImageDto());
        if(imageModel == null)
        {
            return NotFound("Image not found.");
        }
        return Ok(imageModel.ToImageDto());
    }
    [HttpDelete]
    [Route("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var imageModel = await _imageRepo.DeleteAsync(id);

        if (imageModel == null)
        {
            return NotFound("Image not found.");
        }
        return NoContent();
    }
} 