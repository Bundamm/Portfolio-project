using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Repositories
{
    public class ImageRepository
    {
        private readonly PortfolioWebAppContext _context;
        public ImageRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Image> GetAll() => _context.Images.Include(i => i.Project).ToList();
        public Image? GetById(int id) => _context.Images.Include(i => i.Project).FirstOrDefault(i => i.ImageId == id);
        public void Add(Image image) { _context.Images.Add(image); _context.SaveChanges(); }
        public void Update(Image image) { _context.Images.Update(image); _context.SaveChanges(); }
        public void Delete(int id) { var image = _context.Images.Find(id); if (image != null) { _context.Images.Remove(image); _context.SaveChanges(); } }
    }
} 