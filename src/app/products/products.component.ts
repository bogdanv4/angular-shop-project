import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ProductService } from '../shared/services/product.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CapitalizePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  errorMessage = '';
  sub!: Subscription;
  productCategories: string[] = [];
  sub2!: Subscription;
  sub3!: Subscription;
  activeCategory: string = '';

  private _listFilter: string = '';
  filteredProducts: IProduct[] = [];

  // Pagination variables
  currentPage: number = 1;
  limit: number = 9;
  totalProducts: number = 0;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // this.sub = this.productService.getProducts().subscribe({
    //   next: (products: any) => {
    //     this.products = products.products;
    //     this.filteredProducts = this.products;
    //   },
    //   error: (err) => (this.errorMessage = err),
    // });

    this.loadProducts();

    this.sub2 = this.productService.getCategories().subscribe({
      next: (categories: any) => {
        this.productCategories = categories;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

  performFilter(value: string): IProduct[] {
    value = value.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.title.toLocaleLowerCase().includes(value)
    );
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.currentPage = 1; // Reset to the first page for the new category
    this.loadProducts();

    this.sub3 = this.productService
      .getProductsByCategories(this.activeCategory)
      .subscribe({
        next: (products: any) => {
          this.products = products.products;
          this.filteredProducts = this.products;
        },
        error: (err) => (this.errorMessage = err),
      });
  }

  loadProducts(): void {
    const skip = (this.currentPage - 1) * this.limit;
    this.sub = this.productService
      .getProductsWithPagination(this.limit, skip)
      .subscribe({
        next: (products: any) => {
          this.products = products.products;
          this.filteredProducts = this.products;
          this.totalProducts = products.total;
        },
        error: (err) => (this.errorMessage = err),
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.limit);
  }
}
