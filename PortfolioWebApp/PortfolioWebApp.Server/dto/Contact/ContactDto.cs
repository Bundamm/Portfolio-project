using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Contact
{
    public class ContactDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;

        [Required]
        [StringLength(500)]
        public string Message { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Subject { get; set; } = null!;
    }
}