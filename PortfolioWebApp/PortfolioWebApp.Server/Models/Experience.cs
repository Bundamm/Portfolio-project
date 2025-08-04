namespace PortfolioWebApp.Server.Models
{
    public class Experience
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Workplace { get; set; } = null!;
        public string WorkDescription { get; set; } = null!;

    }


}
