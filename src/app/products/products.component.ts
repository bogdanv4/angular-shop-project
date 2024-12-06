import { Component, OnInit } from '@angular/core';
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
  selectIsLoading,
  selectError,
} from '../state/selectors/products.selector';
import { Observable } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { NoDataComponent } from '../no-data/no-data.component';
import { ServerErrorComponent } from '../server-error/server-error.component';
import { addToCart } from '../state/actions/cart.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CapitalizePipe,
    RouterLink,
    RouterOutlet,
    MatSliderModule,
    ReactiveFormsModule,
    NoDataComponent,
    ServerErrorComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products$!: Observable<IProduct[]>;
  categories$!: Observable<string[]>;
  totalProducts$!: Observable<number>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  listFilter: string = '';
  filteredProducts: IProduct[] = [];

  activeCategory: string = '';

  currentPage: number = 1;
  limit: number = 9;
  totalPages: number = 0;

  // Price range:
  minPriceRangeValue!: number;
  maxPriceRangeValue!: number;
  startValue!: number;
  endValue!: number;

  // FORM control
  sliderLeft!: FormControl;
  sliderRight!: FormControl;

  // Cart notification icon
  showNotifyIcon: boolean = false;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectProducts);
    this.categories$ = this.store.select(selectCategories);
    this.totalProducts$ = this.store.select(selectTotalProducts);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);

    this.sliderLeft = new FormControl(this.startValue);
    this.sliderRight = new FormControl(this.endValue);

    this.sliderLeft.valueChanges.pipe().subscribe((value) => {
      console.log(value);
    });
    this.sliderRight.valueChanges.pipe().subscribe((value) => {
      console.log(value);
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.store.dispatch(loadCategories());

    this.products$.subscribe((products) => {
      this.filteredProducts = products;

      const prices = products.map((product) => product.price);
      this.setMinAndMaxPricesFromProducts(prices);
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

  filterProductsByPriceRange(): void {
    this.products$.subscribe((products) => {
      this.filteredProducts = products.filter(
        (product) =>
          product.price >= this.startValue && product.price <= this.endValue
      );
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

  setMinAndMaxPricesFromProducts(prices: number[]): void {
    this.minPriceRangeValue = Math.min(...prices);
    this.maxPriceRangeValue = Math.max(...prices);

    this.startValue = this.minPriceRangeValue;
    this.endValue = this.maxPriceRangeValue;

    this.sliderLeft = new FormControl(this.startValue);
    this.sliderRight = new FormControl(this.endValue);
  }

  updateSliderValue(event: any): void {
    const value = event.target.ariaValueText;
    const left = event.target.nextElementSibling.classList.contains(
      'mat-slider__right-input'
    );

    if (left) {
      this.startValue = value;
    } else if (!left) {
      this.endValue = value;
    }

    this.filterProductsByPriceRange();
  }

  addToCart(product: IProduct): void {
    this.store.dispatch(addToCart({ product }));
    alert('Product has been added to your cart');
    this.showNotifyIcon = true;

    setTimeout(() => {
      this.showNotifyIcon = false;
    }, 5000);
  }
}
