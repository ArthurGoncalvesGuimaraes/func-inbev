
using FuncInbev.Application.Services.AuthService.Responses;
using MediatR;
namespace FuncInbev.Application.Services.AuthService.Commands
{
    public class LoginCommand : IRequest<AuthResponse>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
