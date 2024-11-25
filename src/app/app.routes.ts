import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { IndividualProductComponent } from './products/individual-product/individual-product.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: IndividualProductComponent },
  { path: '', component: ProductsComponent },
];
