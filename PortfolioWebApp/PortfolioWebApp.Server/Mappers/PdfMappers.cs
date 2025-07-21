using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Image;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.Data;
using System.Net.NetworkInformation;
using PortfolioWebApp.Server.DTO.Pdf;
using System.Runtime.CompilerServices;

namespace PortfolioWebApp.Server.Mappers
{
    public static class PdfMappers
    {
        public static PdfDto ToPdfDto(this Pdf pdfModel)
        {
            return new PdfDto
            {
                Id = pdfModel.PdfId,
                Path = pdfModel.PdfPath,
                ProjectId = pdfModel.ProjectId
            };
        }
        public static Pdf ToPdfFromCreatePdfDto(this CreatePdfDto pdfDto)
        {
            return new Pdf
            {
                ProjectId = pdfDto.ProjectId,
                PdfPath = pdfDto.Path,
                PdfName = pdfDto.Name
            };
        }

        public static Pdf ToPdfFromUpdateDto(this UpdatePdfDto pdfDto)
        {
            return new Pdf
            {
                PdfPath = pdfDto.Path
            };
        }
    }
}
