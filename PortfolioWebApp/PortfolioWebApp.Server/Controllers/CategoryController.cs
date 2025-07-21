using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.Mappers;
using PortfolioWebApp.Server.Models;

[ApiController]
[Route("api/category")]
public class CategoryController : ControllerBase
{
    // Hard Coded list cause idk if we gonna implemented CRUD for categories
    public static readonly List<Category> _categories = new List<Category>
    {
        new Category { CategoryId = 1, CategoryName = "Gqux", Description = "Description for Gqux" },
        new Category { CategoryId = 2, CategoryName = "Gquux", Description = "Description for Gquux" },
        new Category { CategoryId = 3, CategoryName = "Gguuxx", Description = "Descrpiton for Gquuux" }
    };

    [HttpGet]
    public IActionResult GetAll()
    {
        var categoryDtos = _categories.Select(c => c.ToCategoryDto());
        return Ok(categoryDtos);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        var category = _categories.FirstOrDefault(c => c.CategoryId == id);
        if (category == null)
            return NotFound();

        return Ok(category.ToCategoryDto());
    }
}
