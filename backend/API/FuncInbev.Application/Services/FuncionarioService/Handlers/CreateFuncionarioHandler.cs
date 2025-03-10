using MediatR;
using Microsoft.AspNetCore.Identity;
using FuncInbev.Application.Services.FuncionarioService.Commands;
using FuncInbev.Application.Services.FuncionarioService.Responses;
using FuncInbev.Domain.Entities;
using FuncInbev.Domain.Enums;
using FuncInbev.Domain.Interfaces;

namespace Application.Services.FuncionarioService.Handlers
{
    public class CreateFuncionarioHandler : IRequestHandler<CreateFuncionarioCommand, FuncionarioResponse>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IFuncionarioRepository _funcionarioRepository;

        public CreateFuncionarioHandler(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IFuncionarioRepository funcionarioRepository)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _funcionarioRepository = funcionarioRepository;
        }

        public async Task<FuncionarioResponse> Handle(CreateFuncionarioCommand request, CancellationToken cancellationToken)
        {
            // Verifica se já existe um funcionário com o mesmo documento
            if (await _funcionarioRepository.ExistsByDocumentoAsync(request.NumeroDocumento))
            {
                throw new Exception("Já existe um funcionário com este número de documento.");
            }

            // Valida se o funcionário tem idade mínima (18 anos)
            if ((DateTime.Now.Year - request.DataNascimento.Year) < 18)
            {
                throw new Exception("O funcionário deve ser maior de idade.");
            }

            // Cargo já está definido corretamente, então basta utilizá-lo
            RoleEnum cargoEnum = request.Cargo;

            // Cria o usuário no Identity
            var user = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email,
                FullName = $"{request.Nome} {request.Sobrenome}"
            };

            var result = await _userManager.CreateAsync(user, request.Senha);

            if (!result.Succeeded)
            {
                throw new Exception($"Erro ao criar usuário: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }

            // Verifica se a Role já existe, senão cria
            var roleName = cargoEnum.ToString(); // Transforma o Enum em string
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            // Atribui o Cargo (Role) ao Usuário
            await _userManager.AddToRoleAsync(user, roleName);

            // Cria o Funcionário no banco
            var funcionario = new Funcionario
            {
                Nome = request.Nome,
                Sobrenome = request.Sobrenome,
                Email = request.Email,
                NumeroDocumento = request.NumeroDocumento,
                Telefones = request.Telefones,
                NomeGerente = request.NomeGerente,
                Cargo = cargoEnum, // Agora corretamente atribuído
                DataNascimento = request.DataNascimento,
                UsuarioId = new Guid(user.Id)
            };

            await _funcionarioRepository.AddAsync(funcionario);

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
