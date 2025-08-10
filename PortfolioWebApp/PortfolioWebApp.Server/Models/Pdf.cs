using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioWebApp.Server.Models
{
    public class Pdf
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PdfId { get; set; }
        
        [Required]
        public int ProjectId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string PdfName { get; set; } = null!;
        
        [Required]
        [StringLength(500)]
        public string PdfPath { get; set; } = null!;

        [ForeignKey("ProjectId")]
        public Project? Project { get; set; }
    }
}
