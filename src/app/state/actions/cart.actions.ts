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
