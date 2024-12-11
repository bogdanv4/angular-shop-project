import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import {
  addToCart,
  updateProductQuantity,
  removeFromCart,
} from '../actions/cart.actions';
import { IProduct } from '../../shared/models/product';

@Injectable()
export class CartEffects {
  private actions$: Actions = inject(Actions);

  saveCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCart, updateProductQuantity, removeFromCart),
        tap((action) => {
          const cartState = JSON.parse(
            localStorage.getItem('cart') || '[]'
          ) as IProduct[];
          let updatedCart: IProduct[];

          if (action.type === '[Cart] Add To Cart') {
            updatedCart = [...cartState, (action as any).product];
          } else if (action.type === '[Cart] Update Product Quantity') {
            const { productId, quantity } = action as any;
            updatedCart = cartState.map((product) =>
              product.id === productId ? { ...product, quantity } : product
            );
          } else {
            const { productId } = action as any;
            updatedCart = cartState.filter(
              (product) => product.id !== productId
            );
          }

          localStorage.setItem('cart', JSON.stringify(updatedCart));
        })
      ),
    { dispatch: false }
  );

  //   constructor(private actions$: Actions) {}
}
