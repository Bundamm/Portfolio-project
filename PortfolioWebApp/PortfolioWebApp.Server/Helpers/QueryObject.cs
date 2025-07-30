using System.Threading.Tasks;

namespace PortfolioWebApp.Server.Helpers
{
    public class QueryObject
    {
        public string? SortBy { get; set; } = null;
        public bool IsDescending { get; set; } = false;
    }
}