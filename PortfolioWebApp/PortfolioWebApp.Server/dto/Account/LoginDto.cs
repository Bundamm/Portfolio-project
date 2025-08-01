using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Account
{
    public class LoginDto
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}