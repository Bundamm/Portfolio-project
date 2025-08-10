using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO.Experience;
using PortfolioWebApp.Server.Interfaces;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Repositories;

namespace PortfolioWebApp.Server.Controllers
{
    [Route("api/experience")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly IExperienceRepository _experienceRepository;

        public ExperienceController(IExperienceRepository experienceRepository)
        {
            _experienceRepository = experienceRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var experiences = await _experienceRepository.GetAllAsync();
            var dtoList = experiences.Select(e => e.ToExperienceDto());
            return Ok(dtoList);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var experience = await _experienceRepository.GetByIdAsync(id);
            if (experience == null) return NotFound();

            return Ok(experience.ToExperienceDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateExperienceDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var created = await _experienceRepository.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.ToExperienceDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateExperienceDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updated = await _experienceRepository.UpdateAsync(id, dto);
            if (updated == null) return NotFound();

            return Ok(updated.ToExperienceDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _experienceRepository.DeleteAsync(id);
            return result ? NoContent() : NotFound();
        }
    }
}
