import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUserDto } from '../../../core/models/user.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterFormComponent, MatSnackBarModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  constructor(private router: Router, private userService: UserService, private snackbar: MatSnackBar) {}

  public back(): void {
    this.router.navigateByUrl('/login');
  }

  public register(user: IUserDto): void {
    const alreadyExists = this.userService.getUserByEmail(user.email);
    if(!alreadyExists) {
      this.userService.saveUser(user);
      this.router.navigateByUrl('/login');
    } else {
      this.snackbar.open('Utilisateur déja existant', 'Fermer', {
        duration: 2000,
      });
    }
  }
}
