import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../shared/models/user';
import { Store } from '@ngrx/store';
import {
  selectLoggedInUser,
  selectLoginError,
} from '../state/selectors/user.selector';
import { loginUser } from '../state/actions/user.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error$: Observable<string | null>;
  loggedinUser$: Observable<any>;

  constructor(private store: Store) {
    this.error$ = this.store.select(selectLoginError);
    this.loggedinUser$ = this.store.select(selectLoggedInUser);
  }

  login(email: string, password: string): void {
    this.store.dispatch(loginUser({ email, password }));
  }
}
