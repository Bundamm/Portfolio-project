using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using PortfolioWebApp.Server.DTO.Category;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Repositories;

[ApiController]
[Route("api/category")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;
    
    public CategoryController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _categoryRepository.GetAllAsync();
        var categoryDtos = categories.Select(c => c.ToCategoryDto());
        return Ok(categoryDtos);
    }
    

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
        {
            return NotFound();
        }
        return Ok(category.ToCategoryDto());
    }
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCategoryDto categoryDto)
    {

        var categoryModel = categoryDto.ToCategoryFromCreateDto();
        var created = await _categoryRepository.CreateAsync(categoryModel);
        return CreatedAtAction(nameof(GetById), new { id = created.CategoryId }, created.ToCategoryDto());
    }
    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromBody] UpdateCategoryDto categoryDto, [FromRoute] int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var update = await _categoryRepository.UpdateAsync(id, categoryDto);
        if(update == null)
        {
            return NotFound();
        }
        return Ok(update.ToCategoryDto());
    }
    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var delete = await _categoryRepository.DeleteAsync(id);
        if(delete == null)
        {
            return NotFound();
        }
        return NoContent();
    }

    
}
