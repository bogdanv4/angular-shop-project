import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from '../shared/models/user';
import { registerUser } from '../state/actions/user.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  validationErrors: string[] = [];

  constructor(private store: Store) {}

  registerUser(email: string, password: string, role: string): void {
    if (this.formValidation(email, password).length === 0) {
      const newUser: IUser = {
        id: Date.now(),
        email,
        password,
        role,
      };
      // this.store.dispatch(registerUser({ user: newUser }));
      alert('User registration successfull');
    } else {
      this.validationErrors = this.formValidation(email, password);
    }
  }

  formValidation(email: string, password: string): string[] {
    this.validationErrors = [];

    const emailError = this.validateEmail(email);
    if (emailError) {
      this.validationErrors.push(emailError);
    }

    const passwordError = this.validatePassword(password);
    if (passwordError) {
      this.validationErrors.push(passwordError);
    }

    return this.validationErrors;
  }

  validateEmail(email: string): string {
    let error: string = '';

    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let result = email.match(pattern);

    if (result === null) error = 'Email must be in valid format';

    return error;
  }

  validatePassword(password: string): string {
    let error: string = '';

    if (password.length < 8) error = 'Password must have at least 8 characters';

    return error;
  }
}
