namespace PortfolioWebApp.Server.Models
{
    public class Image
    {
        public int ImageID { get; set; }
        public int ProjectID { get;set; }
        public string ImagePath { get; set; } = null!;

        public Project? Project { get; set; }

    }
}
