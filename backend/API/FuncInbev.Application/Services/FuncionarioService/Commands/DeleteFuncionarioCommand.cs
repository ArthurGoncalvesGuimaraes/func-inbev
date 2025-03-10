using MediatR;

namespace Application.Services.FuncionarioService.Commands
{
    public class DeleteFuncionarioCommand : IRequest<bool>
    {
        public Guid Id { get; set; } // ID do funcionário a ser excluído

        public DeleteFuncionarioCommand(Guid id)
        {
            Id = id;
        }
    }
}
