import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../shared/models/product';
import {
  addToCart,
  loadCart,
  removeFromCart,
  updateProductQuantity,
} from '../actions/cart.actions';

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
  })),
  on(removeFromCart, (state, { productId }) => ({
    ...state,
    products: state.products.filter((product) => product.id !== productId),
  })),
  on(loadCart, (state, { products }) => ({
    ...state,
    products,
  }))
);
