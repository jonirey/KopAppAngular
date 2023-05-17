import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  nombreUsuario: string ='';
  email: string='';
  password: string='';

  constructor(private http: HttpClient) {}

  submitForm() {
    const newUser = {
      displayName: this.nombreUsuario,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:5263/register', newUser, { responseType: 'text' })
      .pipe(
        tap(() => {
          alert('Usuario registrado');
          window.location.href = 'http://localhost:4200/';
        }),
        catchError((error) => {
          console.error('Error al registrar el usuario:', error);
          return of(error); // O cualquier otra acción que desees realizar
        })
      )
      .subscribe();
  }
}
