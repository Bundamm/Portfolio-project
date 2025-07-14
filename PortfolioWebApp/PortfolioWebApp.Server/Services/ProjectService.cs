using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;

public class ProjectService
{
    private readonly AppDbContext _context;

    public ProjectService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Project>> GetAllAsync()
    {
        return await _context.Projects
            .Include(p => p.CategoryRef)
            .Include(p => p.User)
            .Include(p => p.Images)
            .Include(p => p.Pdfs)
            .OrderByDescending(p => p.ProjectId)
            .ToListAsync();
    }

    public async Task<Project?> GetByIdAsync(int id)
    {
        return await _context.Projects
            .Include(p => p.CategoryRef)
            .Include(p => p.User)
            .Include(p => p.Images)
            .Include(p => p.Pdfs)
            .FirstOrDefaultAsync(p => p.ProjectId == id);
    }

    public async Task<Project> CreateAsync(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var project = await _context.Projects
            .Include(p => p.Images)
            .Include(p => p.Pdfs)
            .FirstOrDefaultAsync(p => p.ProjectId == id);

        if (project == null)
            return false;

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Project?> UpdateAsync(int id, Project updated)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return null;

        project.ProjectName = updated.ProjectName;
        project.Description = updated.Description;
        project.Category = updated.Category;
        project.UserId = updated.UserId;

        await _context.SaveChangesAsync();
        return project;
    }
}
