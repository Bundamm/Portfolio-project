using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Image;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.Data;

namespace PortfolioWebApp.Server.Mappers
{
    public static class ImageMappers
    {
        public static ImageDto ToImageDto(this Image imageModel)
        {
            return new ImageDto
            {
                Id = imageModel.ImageId,
                Path = imageModel.ImagePath,
                ProjectId = imageModel.ProjectId
            };
        }
        public static Image ToImageFromCreateImageDto(this CreateImageDto imageDto)
        {
            return new Image
            {
                ProjectId = imageDto.ProjectId,
                ImagePath = imageDto.Path,
                Project = null
            };
        }
    }
}

