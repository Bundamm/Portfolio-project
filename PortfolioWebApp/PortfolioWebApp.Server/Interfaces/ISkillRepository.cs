namespace PortfolioWebApp.Server.Interfaces
{
    using PortfolioWebApp.Server.Models;
    using PortfolioWebApp.Server.DTO.Skills;

    public interface ISkillRepository
    {
        Task<IEnumerable<Skill>> GetAllAsync();
        Task<Skill?> GetByIdAsync(int id);
        Task<Skill> CreateAsync(CreateSkillDto dto);
        Task<Skill?> UpdateAsync(int id, UpdateSkillDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
