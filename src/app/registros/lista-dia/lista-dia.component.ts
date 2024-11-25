import { Component, OnInit } from '@angular/core';
import { RegistrosService } from '../registros.service';
import { ActivatedRoute } from '@angular/router';
import { Registro } from '../registro';
import { StatusRegistroComponent } from "../status-registro/status-registro.component";

@Component({
  selector: 'app-lista-dia',
  standalone: true,
  imports: [StatusRegistroComponent],
  templateUrl: './lista-dia.component.html',
  styleUrl: './lista-dia.component.scss',
})
export class ListaDiaComponent implements OnInit {
  registros: Registro[] = new Array(0);

  constructor(
    private registrosService: RegistrosService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let dia = this.activatedRoute.snapshot.paramMap.get('dia');
    let mes = this.activatedRoute.snapshot.paramMap.get('mes');
    let ano = this.activatedRoute.snapshot.paramMap.get('ano');

    this.registrosService.getRegistrosByDia(+dia!, +mes! - 1, +ano!).subscribe({
      next: (data) => {
        this.registros = data;
        console.log(data);
      },
      error: (erro) => {
        console.error(erro);
      },
      complete: () => {},
    });
  }
}
