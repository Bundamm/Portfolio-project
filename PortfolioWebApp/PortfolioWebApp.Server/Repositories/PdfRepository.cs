using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioWebApp.Server.Repositories
{
    public class PdfRepository : IPdfRepository
    {
        private readonly PortfolioWebAppContext _context;
        public PdfRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public IEnumerable<Pdf> GetAll() => _context.pdfs.Include(p => p.Project).ToList();
        public Pdf? GetById(int id) => _context.pdfs.Include(p => p.Project).FirstOrDefault(p => p.PdfId == id);
        public void Add(Pdf pdf) { _context.pdfs.Add(pdf); _context.SaveChanges(); }
        public void Update(Pdf pdf) { _context.pdfs.Update(pdf); _context.SaveChanges(); }
        public void Delete(int id) { var pdf = _context.pdfs.Find(id); if (pdf != null) { _context.pdfs.Remove(pdf); _context.SaveChanges(); } }
    }
} 