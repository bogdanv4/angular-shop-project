import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlProducts = 'https://dummyjson.com/products';
  private urlCategories = 'https://dummyjson.com/products/category-list';

  constructor(private http: HttpClient) {
    console.log('ProductService initialized');
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.urlProducts);
  }

  getSingleProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`https://dummyjson.com/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.urlCategories);
  }

  getProductsByCategories(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `https://dummyjson.com/products/category/${category}`
    );
  }

  getProductsWithPagination(
    limit: number,
    skip: number
  ): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
  }
}
