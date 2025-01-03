import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productsReducer } from './state/reducers/products.reducer';
import { ProductsEffects } from './state/effects/products.effects';
import { singleProductReducer } from './state/reducers/single-product.reducer';
import { SingleProductEffects } from './state/effects/single-product.effects';
import { cartReducer } from './state/reducers/cart.reducer';
import { CartEffects } from './state/effects/cart.effects';
import { UserEffects } from './state/effects/user.effects';
import { userReducer } from './state/reducers/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      products: productsReducer,
      product: singleProductReducer,
      cart: cartReducer,
      user: userReducer,
    }),
    provideEffects(
      ProductsEffects,
      SingleProductEffects,
      CartEffects,
      UserEffects
    ),
  ],
};
