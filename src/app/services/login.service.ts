import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Simulacion de la autenticación
export class LoginService {
  private authenticatedUser: any = null;

  login(email: string, password: string): Observable<boolean> {
    if (this.isValidUser(email, password)) {
      this.authenticatedUser = {
        id: 1,
        email: email,
      };

      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    this.authenticatedUser = null;
  }

  isAuthenticated(): boolean {
    return this.authenticatedUser !== null;
  }

  private isValidUser(email: string, password: string): boolean {
    // Se acepta cualquier correo y contraseña no vacía
    return email !== '' && password !== '';
  }

  getAuthenticatedUser(): any {
    return this.authenticatedUser;
  }
}
