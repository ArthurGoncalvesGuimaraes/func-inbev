using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuncInbev.Application.Services.AuthService.Responses
{
    public class AuthResponse
    {
        public UserResponse User { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }

    }

    public class UserResponse
    {
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
