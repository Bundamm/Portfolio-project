using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.DTO.Category;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Mappers
{
    public static class CategoryMappers
    {
        public static CategoryDto ToCategoryDto(this Category category)
        {
            return new CategoryDto
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName,
                Description = category.Description
            };
        }

        public static Category ToCategoryFromCreateDto(this CreateCategoryDto categoryDto)
        {
            return new Category
            {
                CategoryName = categoryDto.CategoryName,
                Description = categoryDto.Description
            };
        }
    }
}
