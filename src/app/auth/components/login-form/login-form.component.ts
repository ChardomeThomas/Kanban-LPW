import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginFormValue } from '../../models/login-form-value';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  @Output() public onValidate = new EventEmitter<LoginFormValue>();
  @Output() public onRegister = new EventEmitter<void>();

  public validate(): void {
    if(this.loginForm.valid) {
      const loginValue = this.loginForm.value as LoginFormValue;
      this.onValidate.next(loginValue);
    }
  }
}
