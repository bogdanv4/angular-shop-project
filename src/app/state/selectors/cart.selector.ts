import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';

export const selectCart = createFeatureSelector<CartState>('cart');
export const selectCartProducts = createSelector(
  selectCart,
  (cart: CartState) => cart.products
);
