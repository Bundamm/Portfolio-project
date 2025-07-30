using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.AboutMe;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Repositories
{
    public class AboutMeRepository : IAboutMeRepository
    {
        private readonly PortfolioWebAppContext _context;

        public AboutMeRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public async Task<AboutMe?> GetByIdAsync(int id)
        {
            return await _context.AboutMe
                .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<AboutMe?> UpdateAsync(int id, UpdateAboutMeDto aboutMeDto)
        {
            var about = await _context.AboutMe.FindAsync(id);
            if (about == null)
            {
                return null;
            }
            about.Title = aboutMeDto.Title;
            about.Description = aboutMeDto.Description;
            about.PhoneNumber = aboutMeDto.Phone;
            about.Email = aboutMeDto.Email;
            await _context.SaveChangesAsync();
            return about;
        }
    }
}
