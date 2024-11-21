import { Component } from '@angular/core';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { Registro } from '../registro';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CadastroComponent],
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.scss',
})
export class RegistrosComponent {
  registrosCadastrados!:[Registro];
  erroDeCadastro!:[string];

  resultado($event: any) {
    this.registrosCadastrados = $event.sucessos;
    this.erroDeCadastro = $event.erros;
    console.log($event);
  }
}
