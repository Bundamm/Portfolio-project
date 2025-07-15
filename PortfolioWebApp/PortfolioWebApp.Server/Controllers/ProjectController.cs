using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Services;
using PortfolioWebApp.Server.DTO;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ProjectService _projectService;
    private readonly PortfolioWebAppContext _context;

    public ProjectsController(ProjectService projectService, PortfolioWebAppContext portfolioContext)
    {
        _projectService = projectService;
        _context = portfolioContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _projectService.GetAllAsync();
        var dtos = projects.Select(MapToDto).ToList();
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _projectService.GetByIdAsync(id);
        if (project == null)
            return NotFound();
        return Ok(MapToDto(project));
    }

    [HttpPost("create")]
    [Authorize(Roles = "admin,root")]
    public async Task<IActionResult> Create([FromBody] ProjectDto dto)
    {
        try
        {
            var created = await _projectService.CreateProjectAsync(dto.Name, dto.Description, dto.CategoryId, dto.UserId);
            return CreatedAtAction(nameof(GetById), new { id = created.ProjectId }, MapToDto(created));
        }
        catch (AccessViolationException ex)
        {
            return Forbid(ex.Message);
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Update(int id, [FromBody] ProjectDto dto)
    {
        var updatedProject = new Project
        {
            ProjectName = dto.Name,
            Description = dto.Description,
            CategoryId = dto.CategoryId,
            UserId = dto.UserId
        };
        var result = await _projectService.UpdateAsync(id, updatedProject);
        if (result == null)
            return NotFound();
        return Ok(MapToDto(result));
    }

    [HttpDelete("delete/{id}")]
    [Authorize(Roles = "admin,root")]
    public async Task<IActionResult> Delete(int id, [FromQuery] int userId)
    {
        try
        {
            var deleted = await _projectService.DeleteProjectAsync(id, userId);
            if (deleted is null)
                return NotFound();
            return Ok(deleted);
        }
        catch (AccessViolationException ex)
        {
            return Forbid(ex.Message);
        }
    }

    // Mapping method
    private static ProjectDto MapToDto(Project project)
    {
        return new ProjectDto
        {
            Id = project.ProjectId,
            Name = project.ProjectName,
            Description = project.Description,
            CategoryId = project.CategoryId,
            UserId = project.UserId ?? 0,
            ImageIds = project.Images?.Select(i => i.ImageId).ToList() ?? new List<int>(),
            PdfIds = project.Pdfs?.Select(p => p.PdfId).ToList() ?? new List<int>()
        };
    }


}
