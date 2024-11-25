import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Registro } from '../registro';
import { Escalas } from '../../Escalas';

@Component({
  selector: 'app-dia',
  standalone: true,
  imports: [],
  template: `
    <div style="width: 12rem;" (click)="eventoClick()">
      <div>
        <h6>{{ dia }}</h6>
      </div>
      <div class="lh-1 m-0 p-0" id="letra">
        @for (escala of escalas; track $index) { @if
        ((escala.diaUtil!=true)||(diaUtil!=false)) {
        @if(escala.quantidade==valores[$index]) {
        <p class="alert alert-success  m-0 p-1">
          {{ escala.nome }}( <strong>{{ valores[$index] }}</strong
          >)
        </p>
        }@else {
        <p class="alert alert-danger m-0 p-1">
          {{ escala.nome }}( <strong>{{ valores[$index] }}</strong
          >)
        </p>
        } } }
      </div>
    </div>
  `,
  styleUrl: './dia.component.scss',
})
export class DiaComponent implements OnInit {
  @Input() dia: number = 1;
  @Input() registros!: Registro[];
  @Input() diaUtil: boolean = false;
  @Output() clicado = new EventEmitter();

  escalas = Escalas;
  valores: number[] = new Array(0);

  ngOnInit(): void {
    this.escalas.forEach((e) => {
      if (e.diaUtil == true && this.diaUtil == false) {
      } else {
        let v = this.registros.filter(
          (reg) => reg.vigilante.escala == e.nome
        ).length;
        this.valores.push(v);
      }
    });
  }
  eventoClick(){
    this.clicado.emit(this.dia);
  }
}
