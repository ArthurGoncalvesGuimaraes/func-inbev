using MediatR;
using FuncInbev.Domain.Entities;
using FuncInbev.Domain.Enums;
using System.Text.Json.Serialization;
using FuncInbev.Application.Services.FuncionarioService.Responses;

namespace Application.Services.FuncionarioService.Commands
{
    public class UpdateFuncionarioCommand : IRequest<FuncionarioResponse>
    {
        public Guid Id { get; set; }
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
