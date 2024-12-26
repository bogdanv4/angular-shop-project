import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  loadProductsByCategories,
  loadProductsByCategoriesSuccess,
  loadProductsByCategoriesFailure,
} from '../actions/products.actions';
import { IProduct } from '../../shared/models/product';
import {
  loadSingleProduct,
  loadSingleProductFailure,
  loadSingleProductSuccess,
} from '../actions/single-product.actions';

export interface SingleProductState {
  product: any;
  error: string | null;
  loading: boolean;
}

const initialState: SingleProductState = {
  product: null,
  error: null,
  loading: false,
};

export const singleProductReducer = createReducer(
  initialState,
  on(loadSingleProduct, (state) => ({ ...state, loading: true })),
  on(loadSingleProductSuccess, (state, { product }) => ({
    ...state,
    product,
    loading: false,
    error: null,
  })),
  on(loadSingleProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
