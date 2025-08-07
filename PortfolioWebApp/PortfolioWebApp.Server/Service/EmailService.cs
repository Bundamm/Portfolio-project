using MimeKit;
using PortfolioWebApp.Server.DTO.Contact;
using PortfolioWebApp.Server.Interfaces;
namespace PortfolioWebApp.Server.Service
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendEmailAsync(ContactDto contactDto)
        {
            try
            {
                // Creating the body of a message
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_configuration["Email:From"]));
                email.To.Add(MailboxAddress.Parse(_configuration["Email:To"]));
                email.Subject = $"Kontakt ze strony: {contactDto.Subject}";

                var builder = new BodyBuilder();
                builder.HtmlBody = $@"
                    <h2>Kontakt</h2>
                    <p><strong>Od:</strong> {contactDto.Name} ({contactDto.Email})</p>
                    <p><strong>Temat:</strong> {contactDto.Subject}</p>
                    <p><strong>Wiadomo��:</strong></p>
                    <p>{contactDto.Message}</p>
                ";
                email.Body = builder.ToMessageBody();

                // Sending the message by using the SMTP client
                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                await smtp.ConnectAsync(
                    _configuration["Email:SmtpServer"],
                    int.Parse(_configuration["Email:Port"]),
                    MailKit.Security.SecureSocketOptions.StartTls
                );

                await smtp.AuthenticateAsync(
                    _configuration["Email:Username"],
                    _configuration["Email:Password"]
                );

                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);

                return true;



            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "B��d podczas wysy�ania emaila.");
                return false;
            }
        }
    }
}
