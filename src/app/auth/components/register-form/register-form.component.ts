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
import { MatSelectModule } from '@angular/material/select';
import { DateValidators } from '../../../shared/helper/date-validators.helper';
import { StringValidators } from '../../../shared/helper/string-validators.helper';
import { JsonPipe } from '@angular/common';
import { IUserDto } from '../../../core/models/user.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    JsonPipe,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  public form = new FormGroup(
    {
      gender: new FormControl('M', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      date: new FormControl('', [
        Validators.required,
        DateValidators.isDateLessToday,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    [StringValidators.isControlsSame('password', 'password2')]
  );

  @Output() public onRegister = new EventEmitter<IUserDto>();
  @Output() public onBack = new EventEmitter<void>();

  public register(): void {
    const userDto: IUserDto = {
      email: this.form.controls.email.value!,
      password: this.form.controls.password.value!,
      firstname: this.form.controls.firstname.value!,
      lastname: this.form.controls.name.value!,
      birthdate: this.form.controls.date.value!,
      gender: this.form.controls.gender.value!,
    };

    this.onRegister.next(userDto);
  }
}
