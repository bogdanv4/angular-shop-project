import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { IndividualProductComponent } from './individual-product/individual-product.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: IndividualProductComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: ProductsComponent },
];
