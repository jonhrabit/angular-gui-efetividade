import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { RegistrosService } from '../registros.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: ` <form [formGroup]="formCadastro" (ngSubmit)="enviar()">
    <div>
      <label for="textoarea" class="form-label">Texto</label>
      <textarea
        class="form-control"
        id="textoarea"
        rows="10"
        formControlName="texto"
      ></textarea>
    </div>
    <div>
      <button class="btn btn-primary" type="submit">Enviar</button>
    </div>
  </form>`,
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  @Output() resultado: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private registrosService: RegistrosService
  ) {}
  enviar() {
    let data = this.formCadastro.value.texto;
    let resposta: Object;
    console.log(data);

    this.registrosService.importar(data).subscribe({
      next: (data) => {
        resposta = data;
        console.log(data);
      },
      error: (erro) => {
        console.error(erro);
      },
      complete: () => {
        this.resultado.emit(resposta);
      },
    });
  }
  formCadastro: FormGroup = this.fb.group({
    texto: [''],
  });
}
