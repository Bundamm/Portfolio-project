using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


namespace PortfolioWebApp.Server.Data
{
    public class PortfolioWebAppContext : IdentityDbContext<User>
    {
        public PortfolioWebAppContext(DbContextOptions<PortfolioWebAppContext> options) : base(options) { }

        public DbSet<Project>? Projects { get; set; }
        public DbSet<Image>? Images { get; set; }
        public DbSet<Pdf>? Pdfs { get; set; }
        public DbSet<Category>? Categories { get; set; }
        public DbSet<AboutMe>? AboutMe {  get; set; }
        public DbSet<Experience>? Experiences { get; set; }

        public DbSet<Skill>? Skills { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
{
            new IdentityRole
            {
             Name = "Admin",
            NormalizedName = "ADMIN"
            }
};

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }

}
