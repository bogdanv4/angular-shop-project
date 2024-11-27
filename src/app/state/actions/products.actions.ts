import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../shared/models/product';

export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ limit: number; skip: number }>()
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: IProduct[]; total: number }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

export const loadCategories = createAction('[Categories] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: string[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: string }>()
);
