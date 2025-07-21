using Microsoft.AspNetCore.Mvc;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Repositories;
namespace PortfolioWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepo;

    }
}
