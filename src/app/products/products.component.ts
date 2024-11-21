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
  activeCategory: string = '';

  private _listFilter: string = '';
  filteredProducts: IProduct[] = [];

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: (products: any) => {
        this.products = products.products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });

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
  }

  performFilter(value: string): IProduct[] {
    value = value.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.title.toLocaleLowerCase().includes(value)
    );
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }
}
