    using System.ComponentModel.DataAnnotations;

    namespace PortfolioWebApp.Server.Models
    {
        public class Project
        {
            public int ProjectId { get; set; }
            public string ProjectName { get; set; } = null!;
            public string? Description { get; set; }

            public int CategoryId { get; set; }
            public Category? Category { get; set; }

            public List<Image> Images { get; set; } = new List<Image>();
            public List<Pdf> Pdfs { get; set; } = new List<Pdf>();
        }

    }
