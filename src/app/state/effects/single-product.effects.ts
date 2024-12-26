import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../shared/services/product.service';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import {
  loadSingleProduct,
  loadSingleProductFailure,
  loadSingleProductSuccess,
} from '../actions/single-product.actions';

@Injectable()
export class SingleProductEffects {
  private actions$: Actions = inject(Actions);
  private productsService: ProductService = inject(ProductService);

  loadSingleProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSingleProduct),
      mergeMap(({ id }) =>
        this.productsService.getSingleProduct(id).pipe(
          map((response: any) =>
            loadSingleProductSuccess({
              product: response,
            })
          ),
          catchError((error) =>
            of(loadSingleProductFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
