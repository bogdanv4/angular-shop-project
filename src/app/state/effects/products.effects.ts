import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../shared/services/product.service';
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
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { inject, Injectable, Injector } from '@angular/core';

@Injectable()
export class ProductsEffects {
  private actions$: Actions = inject(Actions);
  private productsService: ProductService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(({ limit, skip }) =>
        this.productsService.getProductsWithPagination(limit, skip).pipe(
          map((response: any) =>
            loadProductsSuccess({
              products: response.products,
              total: response.total,
            })
          ),
          catchError((error) =>
            of(loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadProductsBycategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProductsByCategories),
      mergeMap(({ category }) =>
        this.productsService.getProductsByCategories(category).pipe(
          map((response: any) =>
            loadProductsByCategoriesSuccess({
              products: response.products,
              total: response.total,
            })
          ),
          catchError((error) =>
            of(loadProductsByCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      switchMap(() =>
        this.productsService.getCategories().pipe(
          map((categories: string[]) => loadCategoriesSuccess({ categories })),
          catchError((error) =>
            of(loadCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
