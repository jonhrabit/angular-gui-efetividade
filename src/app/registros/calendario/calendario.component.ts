import { Component, Inject, Input, OnInit } from '@angular/core';
import { DiaComponent } from '../dia/dia.component';
import { RegistrosService } from '../registros.service';
import { Registro } from '../registro';
import { Router } from '@angular/router';

interface data {
  dia: number;
  registros: Registro[];
  diaUtil: boolean;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [DiaComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent implements OnInit {
  constructor(
    private registrosService: RegistrosService,
    private route: Router
  ) {}

  @Input() mes: number = 1;
  @Input() ano: number = 2024;
  datas: any[][] | undefined;
  listaDeRegistros!: Registro[];

  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  ngOnInit(): void {
    this.getRegistros();
  }

  public gerarMes() {
    let d = 1 - new Date(this.ano, this.mes - 1, 1).getDay(); //primeiro dia da sena no mÊs
    let total =
      new Date(this.ano, this.mes, 0).getDate() +
      new Date(this.ano, this.mes - 1, 1).getDay();
    let matriz = new Array(Math.ceil(total / 7));
    for (let i = 0; i < 5; i++) {
      matriz[i] = new Array(7);
    }

    for (let semana = 0; semana <= 4; semana++) {
      for (let dia = 0; dia < 7; dia++) {
        matriz[semana][dia] = {
          dia: this.dataFormatada(new Date(this.ano, this.mes - 1, d)),
          registros: this.listaDeRegistros.filter(
            (r) =>
              r.data.split('/')[0] ==
              this.dataFormatada(new Date(this.ano, this.mes - 1, d))
          ),
          diaUtil:
            new Date(this.ano, this.mes - 1, d).getDay() == 0 ||
            new Date(this.ano, this.mes - 1, d).getDay() == 6
              ? false
              : true,
        };

        d++;
      }
    }
    return matriz;
  }

  dataFormatada(data: Date) {
    var dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia;
    return diaF;
  }
  dataFormatadaCompleta(data: Date) {
    var dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = mes.length == 1 ? '0' + mes : mes,
      anoF = data.getFullYear();
    return diaF + '/' + mesF + '/' + anoF;
  }

  getRegistros() {
    this.registrosService.getRegistros(this.mes, this.ano).subscribe({
      next: (data) => {
        this.listaDeRegistros = data;
      },
      error: (erro) => {
        console.error(erro);
      },
      complete: () => {
        console.log(this.listaDeRegistros);
        this.datas = this.gerarMes();
      },
    });
  }

  dataSelect($event: number) {
    console.log($event);
    this.route.navigateByUrl("/registros/dia/"+$event+"/"+this.mes+"/"+this.ano);
  }
}
