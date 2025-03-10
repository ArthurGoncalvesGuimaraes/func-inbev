
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using FuncInbev.Application.Services.FuncionarioService.Commands;
using FuncInbev.Domain.Entities;
using FuncInbev.Application.Services.FuncionarioService.Queries;
using Application.Services.FuncionarioService.Commands;

namespace API.Controllers
{
    //[Authorize(Roles = "Administrador")]
    [ApiController]
    [Route("api/funcionarios")] // Nome no plural, seguindo padrões RESTful
    public class FuncionarioController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FuncionarioController(IMediator mediator)
        {
            _mediator = mediator;
        }

        ///// <summary>
        ///// Lista todos os funcionários.
        ///// </summary>
        ////[HttpGet]
        //public async Task<ActionResult<IEnumerable<Funcionario>>> GetAll()
        //{
        //    var result = await _mediator.Send(new GetAllFuncionariosQuery());
        //    return Ok(result);
        //}

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var funcionarios = await _mediator.Send(new GetAllFuncionariosQuery());
            return Ok(funcionarios);
        }
        /// <summary>
        /// Busca um funcionário pelo ID.
        /// </summary>
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Funcionario>> GetById(int id)
        //{
        //    var result = await _mediator.Send(new GetFuncionarioByIdQuery { Id = id });

        //    if (result == null)
        //        return NotFound(new { Message = "Funcionário não encontrado." });

        //    return Ok(result);
        //}

        /// <summary>
        /// Cadastra um novo funcionário.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateFuncionario(CreateFuncionarioCommand command)
        {
            try
            {
                var result = await _mediator.Send(command);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(new { message = ex.Message }) ;
            }

        }

        /// <summary>
        /// Atualiza um funcionário existente.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFuncionario(Guid id, UpdateFuncionarioCommand command)
        {
            if (id != command.Id)
                return BadRequest(new { Message = "ID do funcionário na URL não corresponde ao corpo da requisição." });

            var result = await _mediator.Send(command);

            if (result == null)
                return NotFound(new { Message = "Funcionário não encontrado." });

            return Ok(result);
        }

        /// <summary>
        /// Exclui um funcionário pelo ID.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuncionario(Guid id)
        {
            var result = await _mediator.Send(new DeleteFuncionarioCommand(id));

            if (!result)
                return NotFound(new { Message = "Funcionário não encontrado." });

            return Ok(); // Código 204 sem resposta
        }
    }
}
