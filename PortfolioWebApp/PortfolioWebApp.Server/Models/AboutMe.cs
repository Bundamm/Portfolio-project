using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioWebApp.Server.Models
{
    public class AboutMe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [StringLength(200)]
        public string? Title { get; set; }
        
        [StringLength(2000)]
        public string? Description { get; set; }
        
        [StringLength(20)]
        public string? PhoneNumber { get; set; }
        
        [StringLength(100)]
        [EmailAddress]
        public string? Email { get; set; }

        public List<Experience> Experiences { get; set; } = new();
        public List<Skill> Skills { get; set; } = new();
    }
}

