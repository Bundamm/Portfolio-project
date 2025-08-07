using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO.Contact;
using PortfolioWebApp.Server.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class MailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly ILogger<MailController> _logger;

        public MailController(IEmailService emailService, ILogger<MailController> logger)
        {
            _emailService = emailService;
            _logger = logger;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendContactEmail([FromBody] ContactDto contactForm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _emailService.SendEmailAsync(contactForm);
                if (result)
                {
                    return Ok(new { message = "Message sent." });
                }
                else
                {
                    return StatusCode(500, new { error = "Error, cannot send message." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "The controller encountered a problem.");
                return StatusCode(500, new { error = "An error occured" });
            }
        }
    }
}