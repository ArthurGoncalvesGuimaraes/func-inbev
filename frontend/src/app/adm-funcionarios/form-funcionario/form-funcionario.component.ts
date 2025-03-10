import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuncionarioRepository } from '../../../data/funcionario/funcionario.repository';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MatSelectModule } from '@angular/material/select';
import { Funcionario } from '../../../domain/models/funcionario/funcionario.model';

@Component({
  selector: 'app-form-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule
    
  ],
  templateUrl: './form-funcionario.component.html',
  styleUrl: './form-funcionario.component.scss'
})
export class FormFuncionarioComponent implements OnInit {
  userForm: FormGroup;
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<FormFuncionarioComponent>);
  private funcionarioRepository = inject(FuncionarioRepository);
  perfisDisponiveis: string[] = []; 
  perfilUsuarioLogado: string = ''; // Perfil do usuário logado

  constructor(private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Funcionario // Injetando os dados do funcionário
  ) {
    this.userForm = this.fb.group({
      id: [
        { value: null, disabled: true },  
      ],
      nome: ['', Validators.required],
      perfil: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroDocumento: ['', Validators.required],
      telefones: this.fb.array([this.fb.control('', Validators.required)]), // Lista dinâmica de telefones
      nomeGerente: ['', Validators.required],
      senha: ['', 
        [
          Validators.required, 
          Validators.minLength(25),   // Pelo menos 6 caracteres
          Validators.pattern(/.*[A-Z].*/),  // Pelo menos uma letra maiúscula
          Validators.pattern(/.*\d.*/),  // Pelo menos um número
          Validators.pattern(/.*\W.*/)  // Pelo menos um caractere especial
        ]
      ],
      dataNascimento: ['', [Validators.required, this.validarIdadeMinima]]
    });
  }

  ngOnInit(): void {
    this.carregarPerfilUsuarioLogado();
    this.definirPerfisDisponiveis();
    if (this.data) {
      this.userForm.patchValue({
        id: this.data.id,
        nome: this.data.nome,
        sobrenome: this.data.sobrenome,
        email: this.data.email,
        numeroDocumento: this.data.numeroDocumento,
        nomeGerente: this.data.nomeGerente,
        dataNascimento: this.data.dataNascimento,
        perfil: this.getTextCargo(this.data.cargo),
      });

      const telefonesFormArray = this.userForm.get('telefones') as FormArray;
      telefonesFormArray.clear(); // Limpa os telefones existentes para evitar duplicação

      this.data.telefones.forEach((telefone: string) => {
              telefonesFormArray.push(this.fb.control(telefone, Validators.required)); 
            });
          }
    }
  getTextCargo(role: number): string {
    const roleMap: Record<number, string> = {
      1: 'Funcionário',
      2: 'Líder',
      3: 'Diretor',
      4: 'Administrador'
    };

    return roleMap[role] ?? 'Funcionário';
  }
  // Getter para acessar os controles do telefone dinamicamente
  get telefones(): FormArray {
    return this.userForm.get('telefones') as FormArray;
  }

  carregarPerfilUsuarioLogado(): void {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      const user = JSON.parse(userToken);
      this.perfilUsuarioLogado = user.role;
    }
  }
  // ✅ Define quais perfis o usuário pode selecionar
  definirPerfisDisponiveis(): void {
    const permissoes = {
      'Administrador': ['Administrador', 'Diretor', 'Líder', 'Funcionário'],
      'Diretor': ['Diretor', 'Líder', 'Funcionário'],
      'Líder': ['Líder', 'Funcionário'],
      'Funcionário': ['Funcionário'] // Não pode criar ninguém
    };

    console.log("teste perfisDisponiveis",this.perfilUsuarioLogado);

    this.perfisDisponiveis = permissoes[this.perfilUsuarioLogado as keyof typeof permissoes] ?? permissoes['Administrador'];
  }
  // Método para adicionar um novo campo de telefone
  addTelefone(): void {
    this.telefones.push(this.fb.control('', Validators.required));
  }
  removeTelefone(index: number): void {
    this.telefones.removeAt(index);
  }

  // Validação de idade mínima (18 anos)
  validarIdadeMinima(control: AbstractControl) {
    if (!control.value) return null;
    
    const hoje = new Date();
    const dataNascimento = new Date(control.value);
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    
    if (idade < 18 || (idade === 18 && hoje < new Date(hoje.getFullYear(), dataNascimento.getMonth(), dataNascimento.getDate()))) {
      return { menorDeIdade: true };
    }
    return null;
  }

  // Método para submeter o formulário
  onSubmit(): void {
    if (this.userForm.valid) {
      const funcionario = { 
        ...this.userForm.value, 
        cargo: this.getEnumCargo(this.userForm.value.perfil) ,
        id: this.data?.id ?? null
      };

      if (this.data) {
        this.funcionarioRepository.update(this.data.id, funcionario).subscribe({
          next: () => {
            this.snackBar.open('Funcionário atualizado com sucesso!', 'Fechar', { duration: 3000 ,   horizontalPosition: 'center', 
              verticalPosition: 'top' });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open(error.message, 'Fechar', {
              duration: 5000,
              horizontalPosition: 'center', 
              verticalPosition: 'top' 
            });
          }
        });
      } else {
        this.funcionarioRepository.create(funcionario).subscribe({
          next: () => {
            this.snackBar.open('Funcionário cadastrado com sucesso!', 'Fechar', { duration: 3000,  horizontalPosition: 'center', 
              verticalPosition: 'top'  });
            this.userForm.reset();
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.snackBar.open(error.message, 'Fechar', {
              duration: 5000,
              horizontalPosition: 'center', 
              verticalPosition: 'top' 
            });
          }
        });
      }
    }
  }

  getEnumCargo(role: string): number {
    const roleMap: { [key: string]: number } = {
      'Funcionário': 1,
      'Líder': 2,
      'Diretor': 3,
      'Administrador': 4
    };
    
    return roleMap[role] ?? 1; 
  }
  
  // Método para fechar o modal
  fechar(): void {
    this.dialogRef.close(false);
  }

  
}
