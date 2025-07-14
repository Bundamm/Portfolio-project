using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Services;

namespace PortfolioWebApp.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class FileController: ControllerBase
    {
        private readonly FileService _fileService;

        public  FileController(FileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost("upload-image")]
        [Authorize(Roles = "admin")]

        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] int projectid)
        {
            var image = await _fileService.UploadImageAsync(file, projectid);
            return Ok(image);

        }

        [HttpPost("upload-pdf")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UploadPdf([FromForm] IFormFile file, [FromForm] int projectId)
        {
            var pdf = await _fileService.UploadPdfAsync(file, projectId);
            return Ok(pdf);
        }

    }
}
