using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class PdfController : ControllerBase
{
    private readonly PdfService _pdfService;
    public PdfController(PdfService pdfService)
    {
        _pdfService = pdfService;
    }

    [HttpPost("upload")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Upload([FromForm] string filePath, [FromForm] int projectId)
    {
        var pdf = await _pdfService.UploadPdfAsync(filePath, projectId);
        return Ok(MapToDto(pdf));
    }

    private static PdfDto MapToDto(Pdf pdf)
    {
        return new PdfDto
        {
            Id = pdf.PdfId,
            ProjectId = pdf.ProjectId,
            Name = pdf.PdfName,
            Path = pdf.PdfPath
        };
    }
} 