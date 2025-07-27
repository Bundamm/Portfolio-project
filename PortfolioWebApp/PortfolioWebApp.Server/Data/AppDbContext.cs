using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Data
{
    public class PortfolioWebAppContext : DbContext
    {
        public PortfolioWebAppContext(DbContextOptions<PortfolioWebAppContext> options) : base(options) { }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Pdf> Pdfs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<AboutMe> AboutMe {  get; set; }
    }

}
