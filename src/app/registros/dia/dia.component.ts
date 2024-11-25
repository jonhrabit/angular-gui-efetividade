import { Component, Input, OnInit } from '@angular/core';
import { Registro } from '../registro';
import { Escalas } from '../../Escalas';

@Component({
  selector: 'app-dia',
  standalone: true,
  imports: [],
  template: `
    <div style="width: 12rem;">
      <div>
        <h6>{{ dia }}</h6>
      </div>
      <div class="texto">
        @for (escala of escalas; track $index) { @if
        ((escala.diaUtil!=true)||(diaUtil!=false)) {
        <p>
          {{ escala.nome }} -
          {{ valores[$index] }}
        </p>
        } }
      </div>
    </div>
  `,
  styleUrl: './dia.component.scss',
})
export class DiaComponent implements OnInit {
  @Input() dia: number = 1;
  @Input() registros!: Registro[];
  @Input() diaUtil: boolean = false;

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
}
