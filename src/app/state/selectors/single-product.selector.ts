import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SingleProductState } from '../reducers/single-product.reducer';

export const selectSingleProductFeature =
  createFeatureSelector<SingleProductState>('product');

export const selectSingleProduct = createSelector(
  selectSingleProductFeature,
  (state: SingleProductState) => state.product
);

export const selectError = createSelector(
  selectSingleProductFeature,
  (state: SingleProductState) => state.error
);

export const selectIsLoading = createSelector(
  selectSingleProductFeature,
  (state: SingleProductState) => state.loading
);
