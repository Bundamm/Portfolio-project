using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.Models
{
    public class Pdf
    {
        public int PdfId { get; set; }
        [Required]
        public int ProjectId { get; set; }
        [Required]
        [MaxLength(100)]
        public string PdfName { get; set; } = null!;
        [Required]
        [MaxLength(255)]
        public string PdfPath { get; set; } = null!;

        public Project? Project { get; set; }
    }

}
