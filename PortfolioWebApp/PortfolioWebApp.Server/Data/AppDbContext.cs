using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Data
{
    public class PortfolioWebAppContext : DbContext
    {
        public PortfolioWebAppContext(DbContextOptions<PortfolioWebAppContext> options) : base(options) { }

        public DbSet<Project> projects { get; set; }
        public DbSet<Image> images { get; set; }
        public DbSet<Pdf> pdfs { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Category> categories { get; set; }
    }

}
