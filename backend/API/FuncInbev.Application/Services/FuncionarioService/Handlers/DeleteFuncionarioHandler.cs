using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using FuncInbev.Application.Services.FuncionarioService.Commands;
using FuncInbev.Domain.Interfaces;
using Application.Services.FuncionarioService.Commands;

namespace FuncInbev.Application.Services.FuncionarioService.Handlers
{
    public class DeleteFuncionarioHandler : IRequestHandler<DeleteFuncionarioCommand, bool>
    {
        private readonly IFuncionarioRepository _funcionarioRepository;

        public DeleteFuncionarioHandler(IFuncionarioRepository funcionarioRepository)
        {
            _funcionarioRepository = funcionarioRepository;
        }

        public async Task<bool> Handle(DeleteFuncionarioCommand request, CancellationToken cancellationToken)
        {
            var funcionario = await _funcionarioRepository.GetByIdAsync(request.Id);

            if (funcionario == null)
            {
                throw new Exception("Funcionário não encontrado.");
            }

            await _funcionarioRepository.DeleteAsync(funcionario.Id);
            return true;
        }
    }
}
