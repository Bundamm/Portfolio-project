using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO.Skills;
using PortfolioWebApp.Server.Interfaces;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Controllers
{
    [Route("api/skills")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly ISkillRepository _skillRepository;

        public SkillController(ISkillRepository skillRepository)
        {
            _skillRepository = skillRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var skills = await _skillRepository.GetAllAsync();
            var dtoList = skills.Select(s => s.ToSkillDto());
            return Ok(dtoList);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var skill = await _skillRepository.GetByIdAsync(id);
            if (skill == null) return NotFound();

            return Ok(skill.ToSkillDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateSkillDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var createdSkill = await _skillRepository.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdSkill.Id }, createdSkill.ToSkillDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSkillDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updatedSkill = await _skillRepository.UpdateAsync(id, dto);
            if (updatedSkill == null) return NotFound();

            return Ok(updatedSkill.ToSkillDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _skillRepository.DeleteAsync(id);
            return result ? NoContent() : NotFound();
        }
    }
}
