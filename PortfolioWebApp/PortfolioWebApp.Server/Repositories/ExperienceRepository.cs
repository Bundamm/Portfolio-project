using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.DTO.Experience;
using PortfolioWebApp.Server.Interfaces;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Repositories
{
    public class ExperienceRepository : IExperienceRepository
    {
        private readonly PortfolioWebAppContext _context;

        public ExperienceRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Experience>> GetAllAsync()
        {
            return await _context.Experiences.ToListAsync();
        }

        public async Task<Experience?> GetByIdAsync(int id)
        {
            return await _context.Experiences.FindAsync(id);
        }

        public async Task<Experience> CreateAsync(CreateExperienceDto dto)
        {
            var experience = new Experience
            {
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Workplace = dto.Workplace,
                WorkDescription = dto.WorkDescription
            };

            _context.Experiences.Add(experience);
            await _context.SaveChangesAsync();
            return experience;
        }

        public async Task<Experience?> UpdateAsync(int id, UpdateExperienceDto dto)
        {
            var experience = await _context.Experiences.FindAsync(id);
            if (experience == null) return null;

            experience.StartDate = dto.StartDate;
            experience.EndDate = dto.EndDate;
            experience.Workplace = dto.Workplace;
            experience.WorkDescription = dto.WorkDescription;

            await _context.SaveChangesAsync();
            return experience;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var experience = await _context.Experiences.FindAsync(id);
            if (experience == null) return false;

            _context.Experiences.Remove(experience);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
