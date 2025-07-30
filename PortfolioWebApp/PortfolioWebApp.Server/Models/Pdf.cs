using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.Models
{
    public class Pdf
    {
        public int PdfId { get; set; }
        public int ProjectId { get; set; }
        public string PdfName { get; set; } = null!;
        public string PdfPath { get; set; } = null!;

        public Project? Project { get; set; }
    }

}
