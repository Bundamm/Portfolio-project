using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.Repositories;
using PortfolioWebApp.Server.DTO.Project;
using PortfolioWebApp.Server.Mappers;


[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectRepository _projectRepository;
    private readonly ICategoryRepository _categoryRepo;

    public ProjectsController(IProjectRepository projectRepository, ICategoryRepository categoryRepo)
    {
        _projectRepository = projectRepository;
        _categoryRepo = categoryRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _projectRepository.GetAllAsync();
        var dtos = projects.Select(p => p.ToProjectDto()).ToList();
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
            return NotFound();
        return Ok(project.ToProjectDto());
    }

    [HttpPost("{categoryId}")]
    public async Task<IActionResult> Create([FromRoute] int categoryId, [FromBody] CreateProjectDto projectDto)
    {
        if(!await _categoryRepo.CategoryExists(categoryId))
        {
            return NotFound("Category for this project does not exist.");
        }
        var projectModel = projectDto.ToProjectFromCreateDto(categoryId);
        var created = await _projectRepository.CreateAsync(projectModel);
        return CreatedAtAction(nameof(GetById), new { id = created.ProjectId }, created.ToProjectDto());
    }

    [HttpPut]
    [Route("{categoryId}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProjectDto dto, [FromRoute] int categoryId)
    {
        var projectModel = await _projectRepository.UpdateAsync(id, dto.ToProjectFromUpdateDto(categoryId));
        if(projectModel == null)
        {
            return NotFound("Project not found.");
        }
        return Ok(projectModel.ToProjectDto());
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(int id, [FromQuery] int userId)
    {
        try
        {
            var deleted = await _projectRepository.DeleteAsync(id);
            if (deleted is null)
                return NotFound();
            return Ok(deleted);
        }
        catch (AccessViolationException ex)
        {
            return Forbid(ex.Message);
        }
    }

}
