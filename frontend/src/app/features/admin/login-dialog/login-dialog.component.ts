import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  private auth = inject(AuthService);
  closed = output<void>();

  email = '';
  pass = '';
  error = '';

  submit(): void {
    if (this.auth.login(this.email, this.pass)) this.closed.emit();
    else this.error = 'Correo o contraseña incorrectos';
  }
}
