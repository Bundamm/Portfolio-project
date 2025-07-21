using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.DTO;

namespace PortfolioWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private static readonly List<CategoryDto> Categories = new()
        {
            new CategoryDto { CategoryId = 1, CategoryName = "foo", Description = "Description of foo" },
            new CategoryDto { CategoryId = 2, CategoryName = "bar", Description = "Description of bar" },
            new CategoryDto { CategoryId = 3, CategoryName = "qux", Description = "Description of qux" },
            new CategoryDto { CategoryId = 4, CategoryName = "quux", Description = "Description of quux" },
            
        };

        [HttpGet]
        public ActionResult<IEnumerable<CategoryDto>> GetAll()
        {
            return Ok(Categories);
        }

        [HttpGet("{id}")]
        public ActionResult<CategoryDto> GetById(int id)
        {
            var category = Categories.FirstOrDefault(c => c.CategoryId == id);
            if (category == null)
                return NotFound();

            return Ok(category);
        }
    }
}
