// Modelo de usuário retornado pelo backend (com roles)

import { User } from "./user.model";

// Modelo de resposta do login (contém usuário e token JWT)
export interface LoginResponse {
  user: User;
  token: string;
}