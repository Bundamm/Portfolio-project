using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.User;

namespace PortfolioWebApp.Server.Mappers
{
    public static class UserMappers
    {
        public static UserDto ToUserDto(this User userModel)
        {
            return new UserDto
            {
                Id = userModel.Id,
                Username = userModel.Username,
                PasswordHash = userModel.PasswordHash,
                Role = userModel.Role,
                Projects = userModel.Projects.Select(project => project.ToProjectDto()).ToList()
            };
        }

        public static User ToUserFromUpdateDto(this UpdateUserDto userDto)
        {
            return new User
            {
                Username = userDto.Username,
                PasswordHash = userDto.PasswordHash,
                Role = userDto.Role
            };
        }
    }
}