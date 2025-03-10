using MediatR;
using System.Collections.Generic;
using FuncInbev.Domain.Entities;

namespace FuncInbev.Application.Services.FuncionarioService.Queries
{
    public class GetAllFuncionariosQuery : IRequest<List<Funcionario>>
    {
    }
}
