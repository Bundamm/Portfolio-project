    using System.ComponentModel.DataAnnotations;

    namespace PortfolioWebApp.Server.Models
    {
        public class Project
        {
            public int ProjectId { get; set; }
            [Required]
            [StringLength(255)]
            public string ProjectName { get; set; } = null!;
            public string? Description { get; set; }

            [Required]
            public int CategoryId { get; set; }
            public Category? Category { get; set; }

            // FK for users
            public int UserId { get; set; }
            public User? User { get; set; }

            public List<Image> Images { get; set; } = new List<Image>();
            public List<Pdf> Pdfs { get; set; } = new List<Pdf>();
        }

    }
