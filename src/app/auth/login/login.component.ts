import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formLogin: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) {}

  entrar() {
    console.log(this.formLogin.value);
    this.http
      .post<LoginResponse>(this.authService.getUrl()+'/login', this.formLogin.value)
      .subscribe({
        next: (data) => {
          this.authService.setToken(data.token);
          console.log(data.token);
        },
        error: (erro) => {
            console.log(erro.error.erro);
        },
        complete:()=>{
          this.router.navigateByUrl("/home");
        }
      });
  }
}
