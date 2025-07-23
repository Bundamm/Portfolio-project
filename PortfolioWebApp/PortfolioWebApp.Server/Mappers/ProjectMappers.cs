using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.DTO.Project;

namespace PortfolioWebApp.Server.Mappers
{
    public static class ProjectMappers
    {
        public static ProjectDto ToProjectDto(this Project projectModel)
        {
            return new ProjectDto
            {
                Id = projectModel.ProjectId,
                Name = projectModel.ProjectName,
                Description = projectModel.Description,
                CategoryId = projectModel.CategoryId,
                UserId = projectModel.UserId,
                Images = projectModel.Images.Select(img => img.ToImageDto()).ToList(),
                Pdfs = projectModel.Pdfs.Select(pdf => pdf.ToPdfDto()).ToList()
            };
        }

        public static Project ToProjectFromCreateDto(this CreateProjectDto dto, int categoryId)
        {
            return new Project
            {
                ProjectName = dto.Name,
                Description = dto.Description,
                CategoryId = categoryId,
                UserId = dto.UserId
            };
        }

        public static Project ToProjectFromUpdateDto(this UpdateProjectDto dto, int categoryId)
        {
            return new Project
            {
                ProjectName = dto.Name,
                Description = dto.Description,
                CategoryId = categoryId,
                UserId = dto.UserId
            };
        }
    }
}
