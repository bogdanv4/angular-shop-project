import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { registerUser } from '../actions/user.actions';
import { tap } from 'rxjs';
import { IUser } from '../../shared/models/user';

@Injectable()
export class UserEffects {
  private actions$: Actions = inject(Actions);

  saveUserToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerUser),
        tap((action) => {
          const users = JSON.parse(
            localStorage.getItem('users') || '[]'
          ) as IUser[];
          users.push(action.user);
          localStorage.setItem('users', JSON.stringify(users));
        })
      ),
    { dispatch: false }
  );
}
