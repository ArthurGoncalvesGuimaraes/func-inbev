using FuncInbev.Application.Services.FuncionarioService.Responses;
using FuncInbev.Domain.Enums;
using MediatR;
using System.Text.Json.Serialization;


namespace FuncInbev.Application.Services.FuncionarioService.Commands
{
    public class CreateFuncionarioCommand : IRequest<FuncionarioResponse>
    {
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public string NumeroDocumento { get; set; }
        public List<string> Telefones { get; set; }
        public string NomeGerente { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RoleEnum Cargo { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Senha { get; set; }
    }
}
