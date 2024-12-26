import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../shared/models/product';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: IProduct }>()
);

export const updateProductQuantity = createAction(
  '[Cart] Update Product Quantity',
  props<{ productId: number; quantity: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const loadCart = createAction(
  '[Cart] Load Cart',
  props<{ products: IProduct[] }>()
);
