using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.DTO.Image;
using Microsoft.AspNetCore.Http.HttpResults;


namespace PortfolioWebApp.Server.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly PortfolioWebAppContext _context;

        public ImageRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public async Task<Image> CreateAsync(Image imageModel)
        {

            await _context.images.AddAsync(imageModel);
            await _context.SaveChangesAsync();
            return imageModel;
        }

        public async Task<Image?> DeleteAsync(int id)
        {
            var imageModel = await _context.images.FirstOrDefaultAsync(x => x.ImageId == id);
            if (imageModel == null)
            {
                return null;
            }
            _context.images.Remove(imageModel);
            await _context.SaveChangesAsync();
            return imageModel;
        }

        public async Task<IEnumerable<Image>> GetAllAsync()
        {
            return await _context.images.ToListAsync();
        }

        public async Task<Image?> GetByIdAsync(int id)
        {
            return await _context.images.FindAsync(id);
        }

        public async Task<Image?> UpdateAsync(int id, Image imageModel)
        {
            var existingImage = await _context.images.FirstOrDefaultAsync(x => x.ImageId == id);
            if (existingImage == null)
            {
                return null;
            }
            existingImage.ImagePath = imageModel.ImagePath;
            await _context.SaveChangesAsync();
            return existingImage;


        }
    }
} 
