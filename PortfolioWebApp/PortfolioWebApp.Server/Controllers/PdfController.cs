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
    public async Task<IActionResult> Upload([FromForm] string filePath, [FromForm] int projectId)
    {
        if (string.IsNullOrWhiteSpace(filePath))
        { 
            return BadRequest("File path is empty."); 
        }

        var fileName = Path.GetFileName(filePath);
        var uploadPath = Path.Combine("uploads", "pdfs", fileName);

        if (!System.IO.File.Exists(filePath))
        {
            return BadRequest("File does not exist at the specified path.");
        }
        if (System.IO.File.Exists(uploadPath))
        { 
                return Conflict("A file with the same name already exists in the uploads/pdfs directory."); }

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