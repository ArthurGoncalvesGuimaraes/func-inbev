import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { debounceTime } from 'rxjs/operators';
import { FuncionarioRepository } from '../../data/funcionario/funcionario.repository';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Funcionario } from '../../domain/models/funcionario/funcionario.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormFuncionarioComponent } from './form-funcionario/form-funcionario.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adm-funcionarios',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,

   
  ],
  templateUrl: './adm-funcionarios.component.html',
  styleUrl: './adm-funcionarios.component.scss'
})
export class AdmFuncionariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'cargo', 'acoes'];
  funcionarios: Funcionario[] = [];
  filteredFuncionarios: Funcionario[] = [];
  searchControl = new FormControl('');
  private dialog = inject(MatDialog);
  constructor(private funcionarioRepository: FuncionarioRepository, private router: Router) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
    this.setupSearch();
  }

  carregarFuncionarios(): void {
    this.funcionarioRepository.getAll().subscribe(funcionarios => {
      this.funcionarios = funcionarios;
      this.filteredFuncionarios = funcionarios;
    });
  }

  setupSearch(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(searchTerm => {
      if (searchTerm) {
        this.filteredFuncionarios = this.funcionarios.filter(func =>
          func.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        this.filteredFuncionarios = this.funcionarios;
      }
    });
  }

  editarFuncionario(funcionario: Funcionario): void {
    console.log('Editar funcionário:', funcionario);
    console.log('Adicionar funcionário');
    const dialogRef = this.dialog.open(FormFuncionarioComponent, {
      width: '800px', 
      disableClose: false, 
      data: funcionario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarFuncionarios(); 
      }
    });
  }

  deletarFuncionario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioRepository.delete(id).subscribe(() => {
        this.funcionarios = this.funcionarios.filter(func => func.id !== id);
        this.filteredFuncionarios = this.funcionarios;
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
  adicionarFuncionario(): void {
    console.log('Adicionar funcionário');
    const dialogRef = this.dialog.open(FormFuncionarioComponent, {
      width: '800px', 
      disableClose: false, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarFuncionarios(); 
      }
    });
  
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);

  }
}
