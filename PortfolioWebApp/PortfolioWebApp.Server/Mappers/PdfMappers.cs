using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO;
using PortfolioWebApp.Server.DTO.Pdf;


namespace PortfolioWebApp.Server.Mappers
{
    public static class PdfMappers
    {
        public static PdfDto ToPdfDto(this Pdf pdfModel)
        {
            return new PdfDto
            {
                Id = pdfModel.PdfId,
                Name = pdfModel.PdfName,
                Path = pdfModel.PdfPath,
                ProjectId = pdfModel.ProjectId
            };
        }
        public static Pdf ToPdfFromCreatePdfDto(this CreatePdfDto pdfDto, int projectId)
        {
            return new Pdf
            {
                ProjectId = projectId,
                PdfPath = pdfDto.Path,
                PdfName = pdfDto.Name
            };
        }

        public static Pdf ToPdfFromUpdateDto(this UpdatePdfDto pdfDto)
        {
            return new Pdf
            {
                PdfPath = pdfDto.Path,
                PdfName = pdfDto.Name
            };
        }
    }
}
