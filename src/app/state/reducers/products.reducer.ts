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

export interface ProductsState {
  products: IProduct[];
  totalProducts: number;
  categories: string[];
  error: string | null;
  loading: boolean;
}

const initialState: ProductsState = {
  products: [],
  totalProducts: 0,
  categories: [],
  error: null,
  loading: false,
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, { products, total }) => ({
    ...state,
    products,
    totalProducts: total,
    loading: false,
    error: null,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadCategories, (state) => ({ ...state, loading: true })),
  on(loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
    error: null,
  })),
  on(loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadProductsByCategories, (state) => ({ ...state, loading: true })),
  on(loadProductsByCategoriesSuccess, (state, { products, total }) => ({
    ...state,
    products,
    totalProducts: total,
    loading: false,
    error: null,
  })),
  on(loadProductsByCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
