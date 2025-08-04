using System;

namespace PortfolioWebApp.Server.Models
{
    public class AboutMe
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }

        public List<Experience> Experiences { get; set; } = new();
        public List<Skill> Skills { get; set; } = new();
    }
}

