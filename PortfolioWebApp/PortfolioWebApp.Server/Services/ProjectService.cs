using Microsoft.EntityFrameworkCore;
using Npgsql.PostgresTypes;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Models.Repositories;

public class ProjectService
{
    private readonly PortfolioWebAppContext _context;

    public ProjectService(PortfolioWebAppContext context, IProjectRepository projectRepository, IUserRepository userRepository)
    {
        _context = context;
    }

    public async Task<Project> CreateProjectAsync(string projectName, string? description, int categoryId, int userId)
    {
        User? user = await _context.Users.FindAsync(userId);
        if(user is null || (user.Role is not "admin" && user.Role is not "root"))
        {
            throw new AccessViolationException("You do not have permission to create a new project.");
        }
        Project project = new Project { ProjectName = projectName, Description = description, CategoryId = categoryId };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return project;
    }
    

    //public async Task<List<Project>> GetAllAsync()
    //{
    //    return await _context.Projects
    //        .Include(p => p.CategoryRef)
    //        .Include(p => p.User)
    //        .Include(p => p.Images)
    //        .Include(p => p.Pdfs)
    //        .OrderByDescending(p => p.ProjectId)
    //        .ToListAsync();
    //}

    //public async Task<Project?> GetByIdAsync(int id)
    //{
    //    return await _context.Projects
    //        .Include(p => p.CategoryRef)
    //        .Include(p => p.User)
    //        .Include(p => p.Images)
    //        .Include(p => p.Pdfs)
    //        .FirstOrDefaultAsync(p => p.ProjectId == id);
    //}

    //public async Task<Project> CreateAsync(Project project)
    //{
    //    _context.Projects.Add(project);
    //    await _context.SaveChangesAsync();
    //    return project;
    //}

    //public async Task<bool> DeleteAsync(int id)
    //{
    //    var project = await _context.Projects
    //        .Include(p => p.Images)
    //        .Include(p => p.Pdfs)
    //        .FirstOrDefaultAsync(p => p.ProjectId == id);

    //    if (project == null)
    //        return false;

    //    _context.Projects.Remove(project);
    //    await _context.SaveChangesAsync();
    //    return true;
    //}

    //public async Task<Project?> UpdateAsync(int id, Project updated)
    //{
    //    var project = await _context.Projects.FindAsync(id);
    //    if (project == null)
    //        return null;

    //    project.ProjectName = updated.ProjectName;
    //    project.Description = updated.Description;
    //    project.Category = updated.Category;
    //    project.UserId = updated.UserId;

    //    await _context.SaveChangesAsync();
    //    return project;
    //}
}
