import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from '../shared/models/user';
import { registerUser } from '../state/actions/user.actions';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  validationErrors: string[] = [];

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    role: new FormControl('1'),
  });

  constructor(private store: Store) {}

  registerUser(): void {
    if (this.registerForm.valid) {
      const { email, password, role } = this.registerForm.value;
      const newUser: IUser = {
        id: Date.now(),
        email: email || '',
        password: password || '',
        role: role || '1',
      };

      // this.store.dispatch(registerUser({ user: newUser }));
      alert('User registration successful');
    }
  }
}
