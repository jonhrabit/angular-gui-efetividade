import { Component } from '@angular/core';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CadastroComponent],
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.scss',
})
export class RegistrosComponent {


  resultado($event: any) {
    console.log("resultaado evento");
    console.log($event);
  }
}
