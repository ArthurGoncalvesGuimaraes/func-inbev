using MediatR;
using Microsoft.AspNetCore.Identity;
using FuncInbev.Application.Services.FuncionarioService.Commands;
using FuncInbev.Application.Services.FuncionarioService.Responses;
using FuncInbev.Domain.Entities;
using FuncInbev.Domain.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Services.FuncionarioService.Commands;

namespace FuncInbev.Application.Services.FuncionarioService.Handlers
{
    public class UpdateFuncionarioHandler : IRequestHandler<UpdateFuncionarioCommand, FuncionarioResponse>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IFuncionarioRepository _funcionarioRepository;

        public UpdateFuncionarioHandler(UserManager<ApplicationUser> userManager, IFuncionarioRepository funcionarioRepository)
        {
            _userManager = userManager;
            _funcionarioRepository = funcionarioRepository;
        }

        public async Task<FuncionarioResponse> Handle(UpdateFuncionarioCommand request, CancellationToken cancellationToken)
        {
            // Buscar funcionário pelo ID
            var funcionario = await _funcionarioRepository.GetByIdAsync(request.Id);
            if (funcionario == null)
            {
                throw new Exception("Funcionário não encontrado.");
            }

            // Atualizar os dados do funcionário
            funcionario.Nome = request.Nome;
            funcionario.Sobrenome = request.Sobrenome;
            funcionario.Email = request.Email;
            funcionario.NumeroDocumento = request.NumeroDocumento;
            funcionario.Telefones = request.Telefones;
            funcionario.NomeGerente = request.NomeGerente;
            funcionario.Cargo = request.Cargo;
            funcionario.DataNascimento = request.DataNascimento;

            // Buscar o usuário correspondente no Identity
            var user = await _userManager.FindByEmailAsync(funcionario.Email);
            if (user == null)
            {
                throw new Exception("Usuário associado ao funcionário não encontrado.");
            }

            // Atualizar informações do usuário no Identity
            user.Email = request.Email;
            user.UserName = request.Email;
            user.FullName = request.Nome + " " + request.Sobrenome;

            var updateUserResult = await _userManager.UpdateAsync(user);
            if (!updateUserResult.Succeeded)
            {
                throw new Exception("Erro ao atualizar usuário no Identity.");
            }

            // Salvar as alterações no banco de dados
            await _funcionarioRepository.UpdateAsync(funcionario);

            return new FuncionarioResponse
            {
                Nome = funcionario.Nome,
                Sobrenome = funcionario.Sobrenome,
                Email = funcionario.Email,
                Cargo = funcionario.Cargo
            };
        }
    }
}
