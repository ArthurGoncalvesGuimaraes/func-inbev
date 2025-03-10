using FuncInbev.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FuncInbev.Application.Services.FuncionarioService.Responses
{
    public class FuncionarioResponse
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
