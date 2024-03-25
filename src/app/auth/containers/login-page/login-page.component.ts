import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { Router } from '@angular/router';
import { LoginFormValue } from '../../models/login-form-value';
import { AuthService } from '../../services/auth.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, MatSnackBarModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  // DI in angular
  constructor(private router: Router, private authService: AuthService, private snackbar: MatSnackBar) {}

  goToRegister() {
    this.router.navigateByUrl('register');
  }

  onLogin(formValue: LoginFormValue): void {
    try{
      this.authService.login(formValue.email, formValue.password);
      this.router.navigateByUrl('home');
    }
    catch(e: any) {
      this.snackbar.open(e.message, 'Fermer', {
        duration: 2000,
      });
    }
  }
}
