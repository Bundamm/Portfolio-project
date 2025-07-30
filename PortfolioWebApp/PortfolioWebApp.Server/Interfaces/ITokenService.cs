using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}