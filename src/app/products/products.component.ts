import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadProducts,
  loadCategories,
} from '../state/actions/products.actions';
import {
  selectProducts,
  selectCategories,
  selectTotalProducts,
} from '../state/selectors/products.selector';
import { Observable } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CapitalizePipe,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products$!: Observable<IProduct[]>;
  categories$!: Observable<string[]>;
  totalProducts$!: Observable<number>;

  listFilter: string = '';
  filteredProducts: IProduct[] = [];
  activeCategory: string = '';
  currentPage: number = 1;
  limit: number = 9;
  totalPages: number = 0;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectProducts);
    this.categories$ = this.store.select(selectCategories);
    this.totalProducts$ = this.store.select(selectTotalProducts);
  }

  ngOnInit(): void {
    this.loadProducts();
    this.store.dispatch(loadCategories());

    this.totalProducts$.subscribe((total) => {
      this.totalPages = Math.ceil(total / this.limit);
    });
  }

  loadProducts(): void {
    const skip = (this.currentPage - 1) * this.limit;
    this.store.dispatch(loadProducts({ limit: this.limit, skip }));
  }

  filterProducts(): void {
    this.products$.subscribe((products) => {
      this.filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(this.listFilter.toLowerCase())
      );
    });
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.filterProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }
}

// products: IProduct[] = [];
// errorMessage = '';
// sub!: Subscription;
// productCategories: string[] = [];
// sub2!: Subscription;
// sub3!: Subscription;
// activeCategory: string = '';
// private _listFilter: string = '';
// filteredProducts: IProduct[] = [];
// currentPage: number = 1;
// limit: number = 9;
// totalProducts: number = 0;
// get listFilter(): string {
//   return this._listFilter;
// }
// set listFilter(value: string) {
//   this._listFilter = value;
//   this.filteredProducts = this.performFilter(value);
// }
// constructor(private productService: ProductService) {}
// ngOnInit(): void {
//   this.loadProducts();
//   this.sub2 = this.productService.getCategories().subscribe({
//     next: (categories: any) => {
//       this.productCategories = categories;
//     },
//     error: (err) => (this.errorMessage = err),
//   });
// }
// ngOnDestroy(): void {
//   // this.sub.unsubscribe();
//   // this.sub2.unsubscribe();
//   // this.sub3.unsubscribe();
// }
// performFilter(value: string): IProduct[] {
//   value = value.toLocaleLowerCase();
//   return this.products.filter((product: IProduct) =>
//     product.title.toLocaleLowerCase().includes(value)
//   );
// }
// setActiveCategory(category: string): void {
//   this.activeCategory = category;
//   this.currentPage = 1;
//   this.loadProducts();
//   this.sub3 = this.productService
//     .getProductsByCategories(this.activeCategory)
//     .subscribe({
//       next: (products: any) => {
//         this.products = products.products;
//         this.filteredProducts = this.products;
//       },
//       error: (err) => (this.errorMessage = err),
//     });
// }
// loadProducts(): void {
//   const skip = (this.currentPage - 1) * this.limit;
//   this.sub = this.productService
//     .getProductsWithPagination(this.limit, skip)
//     .subscribe({
//       next: (products: any) => {
//         this.products = products.products;
//         this.filteredProducts = this.products;
//         this.totalProducts = products.total;
//       },
//       error: (err) => (this.errorMessage = err),
//     });
// }
// onPageChange(page: number): void {
//   this.currentPage = page;
//   this.loadProducts();
// }
// get totalPages(): number {
//   return Math.ceil(this.totalProducts / this.limit);
// }
