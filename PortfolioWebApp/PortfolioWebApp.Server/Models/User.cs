using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; } = null!;
        [Required]
        public string PasswordHash { get; set; } = null!;
        public string Role { get; set; } = "admin"; // lub root

        // Relacje
        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}
