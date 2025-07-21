using PortfolioWebApp.Server.DTO;



namespace PortfolioWebApp.Server.Mappers;
public static class ProjectMappers
{
    public static ProjectDto ToProjectDto(this ProjectDto projectModel)
    {
        return new ProjectDto
        {
            Id = projectModel.Id,
            Name = projectModel.Name,
            Description = projectModel.Description,
            CategoryId = projectModel.CategoryId,
            UserId = projectModel.UserId,
            Pdfs = projectModel.Pdfs.Select(p => p.ToPdfDto()).ToList(),
            Images = projectModel.Images.Select(i => i.ToImageDto()).ToList()
        };
    }
}