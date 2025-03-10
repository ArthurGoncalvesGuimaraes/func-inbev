using FuncInbev.Domain.Entities;


namespace FuncInbev.Domain.Interfaces
{
    public interface IFuncionarioRepository
    {
        /// <summary>
        /// Lista todos os funcionários.
        /// </summary>
        Task<IEnumerable<Funcionario>> GetAllAsync();

        /// <summary>
        /// Obtém um funcionário pelo ID.
        /// </summary>
        Task<Funcionario> GetByIdAsync(Guid id);

        /// <summary>
        /// Adiciona um novo funcionário ao banco de dados.
        /// </summary>
        Task<Funcionario> AddAsync(Funcionario funcionario);

        /// <summary>
        /// Atualiza os dados de um funcionário existente.
        /// </summary>
        Task<Funcionario> UpdateAsync(Funcionario funcionario);

        /// <summary>
        /// Exclui um funcionário pelo ID.
        /// </summary>
        Task<bool> DeleteAsync(Guid id);

        /// <summary>
        /// Verifica se um funcionário já existe com um determinado número de documento.
        /// </summary>
        Task<bool> ExistsByDocumentoAsync(string numeroDocumento);
    }
}
