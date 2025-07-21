using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Repositories;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectRepository _projectRepository;
    private readonly PortfolioWebAppContext _context;

    public ProjectsController(IProjectRepository projectRepository, PortfolioWebAppContext portfolioContext)
    {
        _projectRepository = projectRepository;
        _context = portfolioContext;
    }

    [HttpGet("categories")]
    public IActionResult GetCategories()
    {
        return Ok(CategoryController._categories.Select(c => c.ToCategoryDto()));
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

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] ProjectDto dto)
    {
        var project = new Project
        {
            ProjectName = dto.Name,
            Description = dto.Description,
            CategoryId = dto.CategoryId,
            UserId = dto.UserId
        };
        var created = await _projectRepository.CreateAsync(project);
        return CreatedAtAction(nameof(GetById), new { id = created.ProjectId }, created.ToProjectDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ProjectDto dto)
    {
        var updateDto = new PortfolioWebApp.Server.DTO.Project.UpdateProjectDto
        {
            Name = dto.Name,
            Description = dto.Description,
            CategoryId = dto.CategoryId,
            UserId = dto.UserId
        };
        var result = await _projectRepository.UpdateAsync(id, updateDto);
        if (result == null)
            return NotFound();
        return Ok(result.ToProjectDto());
    }

    [HttpDelete("delete/{id}")]
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
