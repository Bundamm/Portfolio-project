using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Repositories
{
    public class PdfRepository
    {
        private readonly PortfolioWebAppContext _context;
        public PdfRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Pdf> GetAll() => _context.Pdfs.Include(p => p.Project).ToList();
        public Pdf? GetById(int id) => _context.Pdfs.Include(p => p.Project).FirstOrDefault(p => p.PdfId == id);
        public void Add(Pdf pdf) { _context.Pdfs.Add(pdf); _context.SaveChanges(); }
        public void Update(Pdf pdf) { _context.Pdfs.Update(pdf); _context.SaveChanges(); }
        public void Delete(int id) { var pdf = _context.Pdfs.Find(id); if (pdf != null) { _context.Pdfs.Remove(pdf); _context.SaveChanges(); } }
    }
} 