
using System.ComponentModel.DataAnnotations;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Repositories
{
    public class ProjectRepository
    {
        private readonly PortfolioWebAppContext _context;
        public ProjectRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Project> GetAll() => _context.Projects.Include(p => p.Category).Include(p => p.User).Include(p => p.Images).Include(p => p.Pdfs).ToList();
        public Project? GetById(int id) => _context.Projects.Include(p => p.Category).Include(p => p.User).Include(p => p.Images).Include(p => p.Pdfs).FirstOrDefault(p => p.ProjectId == id);
        public void Add(Project project) { _context.Projects.Add(project); _context.SaveChanges(); }
        public void Update(Project project) { _context.Projects.Update(project); _context.SaveChanges(); }
        public void Delete(int id) { var project = _context.Projects.Find(id); if (project != null) { _context.Projects.Remove(project); _context.SaveChanges(); } }
    }
}