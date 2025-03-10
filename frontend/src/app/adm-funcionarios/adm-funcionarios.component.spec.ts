import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmFuncionariosComponent } from './adm-funcionarios.component';

describe('AdmFuncionariosComponent', () => {
  let component: AdmFuncionariosComponent;
  let fixture: ComponentFixture<AdmFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmFuncionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
