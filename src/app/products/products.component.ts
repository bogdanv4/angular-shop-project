import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadProducts,
  loadCategories,
  loadProductsByCategories,
} from '../state/actions/products.actions';
import {
  selectProducts,
  selectCategories,
  selectTotalProducts,
} from '../state/selectors/products.selector';
import { Observable } from 'rxjs';
import { IProduct } from '../shared/models/product';
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

    this.products$.subscribe((products) => {
      this.filteredProducts = products;
    });

    this.totalProducts$.subscribe((total) => {
      this.totalPages = Math.ceil(total / this.limit);
    });
  }

  loadProducts(): void {
    const skip = (this.currentPage - 1) * this.limit;
    this.store.dispatch(loadProducts({ limit: this.limit, skip }));
  }

  loadProductsByCategories(): void {
    this.store.dispatch(
      loadProductsByCategories({ category: this.activeCategory })
    );
  }

  filterProductsBySearch(): void {
    this.products$.subscribe((products) => {
      if (!this.listFilter.trim()) {
        this.filteredProducts = products;
      } else {
        this.filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(this.listFilter.toLowerCase())
        );
      }
    });
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    if (this.activeCategory == '') this.loadProducts();
    else this.loadProductsByCategories();
    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }
}
