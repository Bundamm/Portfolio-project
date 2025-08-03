using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Image;
using PortfolioWebApp.Server.DTO;


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
        public static Image ToImageFromCreateImageDto(this CreateImageDto imageDto, int projectId)
        {
            return new Image
            {
                ImagePath = imageDto.Path,
                ProjectId = projectId
            };
        }

        public static Image ToImageFromUpdateImageDto(this UpdateImageDto imageDto)
        {
            return new Image
            {
                ImagePath = imageDto.Path
            };
        }
    }
}

