using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FuncInbev.Application.Services.AuthService.Commands;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginCommand command)
        {
            var token = await _mediator.Send(command);
            return token != null ? Ok(token) : Unauthorized("Invalid credentials");
        }
    }
}
