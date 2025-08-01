﻿using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO.AboutMe;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Repositories;
using PortfolioWebApp.Server.Mappers;
using Microsoft.AspNetCore.Authorization;


namespace PortfolioWebApp.Server.Controllers
{
    [Route("api/aboutme")]
    [ApiController]
    public class AboutMeController : ControllerBase
    {
        private readonly AboutMeRepository _aboutMeRepository;
        public AboutMeController(AboutMeRepository aboutMeRepository)
        {
            _aboutMeRepository = aboutMeRepository;
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<AboutMe>> GetById(int id)
        {
            var aboutMe = await _aboutMeRepository.GetByIdAsync(id);

            if (aboutMe == null)
            {
                return NotFound();
            }

            return Ok(aboutMe.ToAboutMeDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, UpdateAboutMeDto aboutMeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var update = await _aboutMeRepository.UpdateAsync(id, aboutMeDto);
            if (update == null)
            {
                return NotFound();
            }
            return Ok(update.ToAboutMeDto());
        }
    }
}
