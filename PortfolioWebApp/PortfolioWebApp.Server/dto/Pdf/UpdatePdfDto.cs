using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Pdf
{
    public class UpdatePdfDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Name must be at least 5 characters long.")]
        [MaxLength(25, ErrorMessage = "Name cannot be longer than 25 characters.")]
        public string Name { get; set; } = null!;

        [Required]
        [Url(ErrorMessage = "Path must be a valid URL.")]
        [RegularExpression(@".*\.pdf$", ErrorMessage = "Path must link to a PDF file.")]
        public string Path { get; set; } = null!;
    }
}
