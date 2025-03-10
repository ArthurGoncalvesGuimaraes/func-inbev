export interface Funcionario {
  id: number;
  nome: string;
  cargo: number;
  sobrenome: string;
  email: string;
  numeroDocumento: string;
  nomeGerente: string;
  dataNascimento: Date;
  telefones: string[];
  senha: string;
}