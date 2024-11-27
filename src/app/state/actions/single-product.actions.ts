import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../shared/models/product';

export const loadSingleProduct = createAction(
  '[Single Product] Load Product',
  props<{ id: number }>()
);

export const loadSingleProductSuccess = createAction(
  '[Single Product] Load Product Success',
  props<{ product: IProduct }>()
);

export const loadSingleProductFailure = createAction(
  '[Single Product] Load Product Failure',
  props<{ error: string }>()
);
