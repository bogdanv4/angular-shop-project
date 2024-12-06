import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../shared/models/product';
import { addToCart, updateProductQuantity } from '../actions/cart.actions';

export interface CartState {
  products: IProduct[];
}

export const initialState: CartState = {
  products: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => ({
    ...state,
    products: [
      ...state.products,
      { ...product, quantity: product.quantity ?? 1 },
    ],
  })),
  on(updateProductQuantity, (state, { productId, quantity }) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === productId ? { ...product, quantity: quantity } : product
    ),
  }))
);
