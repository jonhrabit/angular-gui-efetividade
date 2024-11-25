import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Registro } from './registro';

@Injectable({
  providedIn: 'root',
})
export class RegistrosService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  importar(data: string) {
    let h = {
      authorization: this.authService.getHeaders().authorization,
      'content-type': 'text/plain',
    };
    return this.http.post(
      this.authService.getUrl() + '/registros/import',
      data,
      {
        headers: h,
      }
    );
  }
  getRegistros(mes: number, ano: number) {
    let h = {
      authorization: this.authService.getHeaders().authorization,
    };
    return this.http.get<Registro[]>(
      this.authService.getUrl() + '/registros/periodo/' + mes + '/' + ano,
      {
        headers: h,
      }
    );
  }
}
