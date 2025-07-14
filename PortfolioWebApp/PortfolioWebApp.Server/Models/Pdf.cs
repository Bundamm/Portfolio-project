namespace PortfolioWebApp.Server.Models
{
    public class Pdf
    {
        public int PdfId { get; set; }
        public int ProjectId { get; set; }
        public string? PdfName { get; set; }
        public string? PdfPath { get; set; }

        public Project? Project { get; set; }
    }

}
