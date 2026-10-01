import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

/** Prototipo: credenciales fijas. Sustituir por Firebase Auth / backend. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isAdmin = signal(false);
  readonly isAdmin = this._isAdmin.asReadonly();

  login(email: string, pass: string): boolean {
    const ok = email === environment.adminEmail && pass === environment.adminPass;
    this._isAdmin.set(ok);
    return ok;
  }

  logout(): void {
    this._isAdmin.set(false);
  }
}
