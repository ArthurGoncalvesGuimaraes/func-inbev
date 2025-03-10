import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  // Form Field
import { MatDatepickerModule } from '@angular/material/datepicker';  // Data picker
import { MatNativeDateModule } from '@angular/material/core';  // Data nativa
import { MatCardModule } from '@angular/material/card';  // Cartão
import { MatIconModule } from '@angular/material/icon';  // Ícones
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthRepository } from '../../../data/auth/auth.repository';
import { AuthService } from '../../../domain/utils/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    MatButtonModule
  ],
  providers: [DatePipe ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private datePipe: DatePipe,
    private authRepository: AuthRepository,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }




  onSubmit(): void {
    console.log('submit')
    if (this.loginForm.invalid) {
      return;
    }
    const credentials = this.loginForm.value;
    // Chama o AuthRepository para logar na API
    this.authRepository.login(credentials).subscribe({
      next: response => {
        console.log('Login efetuado com sucesso', response);
        // Armazena o token JWT no LocalStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Atualiza o usuário atual no AuthService usando o BehaviorSubject
        this.authService.setCurrentUser(response.user);
        // Redireciona para a página restrita (exemplo: lista de funcionários)
        this.router.navigate(['/funcionarios']);
      },
      error: err => {
        // Trata erro de login (ex: mostrar mensagem de credenciais inválidas)
        console.error('Erro de login', err);
      }
    });
  }
}