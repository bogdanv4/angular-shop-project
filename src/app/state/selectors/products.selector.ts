import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductsState } from '../reducers/products.reducer';

export const selectProductsFeature =
  createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.products
);

export const selectCategories = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.categories
);

export const selectTotalProducts = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.totalProducts
);

export const selectError = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.error
);

export const selectIsLoading = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.loading
);
