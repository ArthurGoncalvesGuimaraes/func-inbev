using FuncInbev.Domain.Entities;
using FuncInbev.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FuncInbev.Domain.Entities
{
    public class Funcionario
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public string NumeroDocumento { get; set; }
        public List<string> Telefones { get; set; } = new List<string>();
        public string NomeGerente { get; set; }
        public RoleEnum Cargo { get; set; }
        public DateTime DataNascimento { get; set; }
        public Guid UsuarioId { get; set; }
        public ApplicationUser Usuario { get; set; }
    }
}
