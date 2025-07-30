using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO.Pdf;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Repositories;

[ApiController]
[Route("api/[controller]")]
public class PdfController : ControllerBase
{
    private readonly PdfRepository _pdfRepo;
    private readonly ProjectRepository _projectRepo;

    public PdfController(PdfRepository pdfRepository, ProjectRepository projectRepository)
    {
        _pdfRepo = pdfRepository;
        _projectRepo = projectRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var pdfs = await _pdfRepo.GetAllAsync();
        var pdfDtos = pdfs.Select(p => p.ToPdfDto());
        return Ok(pdfDtos);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var pdf = await _pdfRepo.GetByIdAsync(id);
        if (pdf == null)
        {
            return NotFound();
        }
        return Ok(pdf.ToPdfDto());
    }

    [HttpPost("{projectId:int}")]
    [Authorize]
    public async Task<IActionResult> Create([FromRoute] int projectId, [FromBody] CreatePdfDto pdfDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        if (!await _projectRepo.ProjectExists(projectId))
        {
            return NotFound("Project does not exist.");
        }

        var pdfModel = pdfDto.ToPdfFromCreatePdfDto(projectId);
        

        await _pdfRepo.CreateAsync(pdfModel);
        return CreatedAtAction(nameof(GetById), new { id = pdfModel.PdfId }, pdfModel.ToPdfDto());
    }

    [HttpPut("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePdfDto pdfDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var updated = await _pdfRepo.UpdateAsync(id, pdfDto.ToPdfFromUpdateDto());
        if (updated == null)
        {
            return NotFound("PDF not found.");
        }

        return Ok(updated.ToPdfDto());
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var deleted = await _pdfRepo.DeleteAsync(id);
        if (deleted == null)
        {
            return NotFound("PDF not found.");
        }

        return NoContent();
    }
}
