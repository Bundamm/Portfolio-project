namespace PortfolioWebApp.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string Role { get; set; } = "admin"; // lub root

        // Relacje
        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}
