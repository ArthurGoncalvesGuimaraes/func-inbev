using MediatR;
using FuncInbev.Domain.Entities;
using FuncInbev.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using FuncInbev.Application.Services.FuncionarioService.Queries;

namespace FuncInbev.Application.Services.FuncionarioService.Handlers
{
    public class GetAllFuncionariosQueryHandler : IRequestHandler<GetAllFuncionariosQuery, List<Funcionario>>
    {
        private readonly IFuncionarioRepository _funcionarioRepository;

        public GetAllFuncionariosQueryHandler(IFuncionarioRepository funcionarioRepository)
        {
            _funcionarioRepository = funcionarioRepository;
        }

        public async Task<List<Funcionario>> Handle(GetAllFuncionariosQuery request, CancellationToken cancellationToken)
        {
            return (List<Funcionario>)await _funcionarioRepository.GetAllAsync();
        }
    }
}
