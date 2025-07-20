
using System.ComponentModel.DataAnnotations;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly PortfolioWebAppContext _context;
        public ProjectRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Project> GetAll() => _context.projects.Include(p => p.Category).Include(p => p.User).Include(p => p.Images).Include(p => p.Pdfs).ToList();
        public Project? GetById(int id) => _context.projects.Include(p => p.Category).Include(p => p.User).Include(p => p.Images).Include(p => p.Pdfs).FirstOrDefault(p => p.ProjectId == id);
        public void Add(Project project) { _context.projects.Add(project); _context.SaveChanges(); }
        public void Update(Project project) { _context.projects.Update(project); _context.SaveChanges(); }
        public void Delete(int id) { var project = _context.projects.Find(id); if (project != null) { _context.projects.Remove(project); _context.SaveChanges(); } }
    }
}