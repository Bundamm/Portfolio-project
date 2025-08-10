using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioWebApp.Server.Models
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProjectId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string ProjectName { get; set; } = null!;
        
        [StringLength(1000)]
        public string? Description { get; set; }

        [Required]
        public int CategoryId { get; set; }
        
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }

        public List<Image> Images { get; set; } = new List<Image>();
        public List<Pdf> Pdfs { get; set; } = new List<Pdf>();
    }
}
