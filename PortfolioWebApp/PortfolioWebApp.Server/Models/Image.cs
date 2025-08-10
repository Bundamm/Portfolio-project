
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioWebApp.Server.Models
{
    public class Image
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ImageId { get; set; }
        
        [Required]
        public int ProjectId { get; set; }
        
        [Required]
        [StringLength(500)]
        public string ImagePath { get; set; } = null!;
        
        public bool IsMain { get; set; } = false;

        [ForeignKey("ProjectId")]
        public Project? Project { get; set; }
    }
}
