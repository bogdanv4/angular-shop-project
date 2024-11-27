import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../shared/services/product.service';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
} from '../actions/products.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductService
  ) {
    console.log('Actions:', this.actions$);
    console.log('ProductService:', this.productsService);
  }

  // loadProducts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadProducts),
  //     mergeMap(({ limit, skip }) =>
  //       this.productsService.getProductsWithPagination(limit, skip).pipe(
  //         map((response: any) =>
  //           loadProductsSuccess({
  //             products: response.products,
  //             total: response.total,
  //           })
  //         ),
  //         catchError((error) =>
  //           of(loadProductsFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );

  // loadCategories$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadCategories),
  //     switchMap(() =>
  //       this.productsService.getCategories().pipe(
  //         map((categories: string[]) => loadCategoriesSuccess({ categories })),
  //         catchError((error) =>
  //           of(loadCategoriesFailure({ error: error.message }))
  //         )
  //       )
  //     ),
  //     tap((x) => console.log(x))
  //   )
  // );
}
