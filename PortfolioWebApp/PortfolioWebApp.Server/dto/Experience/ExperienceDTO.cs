namespace PortfolioWebApp.Server.DTO.Experience
{
    public class ExperienceDto
    {
        public  int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Workplace { get; set; } = null!;
        public string WorkDescription { get; set; } = null!;
    }
    
}
