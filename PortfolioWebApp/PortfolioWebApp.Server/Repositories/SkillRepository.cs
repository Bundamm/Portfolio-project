using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.DTO.Skills;
using PortfolioWebApp.Server.Interfaces;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Repositories
{
    public class SkillRepository : ISkillRepository
    {
        private readonly PortfolioWebAppContext _context;

        public SkillRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Skill>> GetAllAsync()
        {
            return await _context.Skills.ToListAsync();
        }

        public async Task<Skill?> GetByIdAsync(int id)
        {
            return await _context.Skills.FindAsync(id);
        }

        public async Task<Skill> CreateAsync(CreateSkillDto dto)
        {
            var skill = new Skill
            {
                Name = dto.Name
            };

            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();
            return skill;
        }

        public async Task<Skill?> UpdateAsync(int id, UpdateSkillDto dto)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null) return null;

            skill.Name = dto.Name;
            await _context.SaveChangesAsync();
            return skill;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null) return false;

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
