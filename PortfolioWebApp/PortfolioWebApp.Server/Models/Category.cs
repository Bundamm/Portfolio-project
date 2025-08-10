using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioWebApp.Server.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoryId { get; set; }
        
        [Required]
        [StringLength(100)]
        public string? CategoryName { get; set; }
        
        [StringLength(500)]
        public string? Description { get; set; }

        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}
