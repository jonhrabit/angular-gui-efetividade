import { Component, contentChild, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-registro',
  standalone: true,
  imports: [],
  template: ` <div [className]="tipo">{{ texto }}</div> `,
  styleUrl: './status-registro.component.scss',
})
export class StatusRegistroComponent implements OnInit {
  ngOnInit(): void {
    switch (this.texto) {
      case 'Ativo':
        this.tipo = 'btn btn-primary';
        break;
      case 'Falta':
        this.tipo = 'btn btn-danger';
        break;
      case 'Férias':
        this.tipo = 'btn btn-success';
        break;
      case 'Reciclagem':
        this.tipo = 'btn btn-success';
        break;
      default:
        this.tipo = 'btn';
        break;
    }
  }
  @Input() tipo: string = 'btn btn-success';
  @Input() texto: string = '';
}
