namespace PortfolioWebApp.Server.Models
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } = null!;
        public string? Description { get; set; }

        public int Category { get; set; }
        public Category? CategoryRef { get; set; }

        // FK for users
        public int? UserId { get; set; }
        public User? User { get; set; }

        public ICollection<Image> Images { get; set; } = new List<Image>();
        public ICollection<Pdf> Pdfs { get; set; } = new List<Pdf>();
    }

}
