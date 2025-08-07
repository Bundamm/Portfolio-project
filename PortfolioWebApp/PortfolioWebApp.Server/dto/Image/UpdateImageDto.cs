using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Image
{
    public class UpdateImageDto
    {
        [Required]
        [Url(ErrorMessage = "Path must be a valid URL.")]
        [RegularExpression(@".*\.(jpg|jpeg|png|gif|webp)$",
            ErrorMessage = "Path must link to an image file (jpg, jpeg, png, gif, webp).")]
        public string Path { get; set; } = null!;
        public bool IsMain { get; set; } = false;

        [Required]
        public int ProjectId { get; set; }
    }
}
