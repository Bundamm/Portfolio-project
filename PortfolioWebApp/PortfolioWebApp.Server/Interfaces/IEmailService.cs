using PortfolioWebApp.Server.DTO.Contact;

namespace PortfolioWebApp.Server.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(ContactDto contactDto);
    }
}