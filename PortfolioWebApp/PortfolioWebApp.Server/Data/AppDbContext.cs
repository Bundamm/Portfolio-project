using System.Collections.Generic;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Pdf> Pdfs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
    }

}
