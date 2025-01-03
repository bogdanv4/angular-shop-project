import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
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
    return this.http
      .get<IProduct[]>(this.urlProducts)
      .pipe(tap((data) => console.log('All', JSON.stringify(data))));
  }

  getSingleProduct(id: number): Observable<IProduct> {
    return this.http
      .get<IProduct>(`https://dummyjson.com/products/${id}`)
      .pipe(tap((data) => console.log('All', JSON.stringify(data))));
  }

  getCategories(): Observable<string[]> {
    return this.http
      .get<string[]>(this.urlCategories)
      .pipe(tap((data) => console.log('All', JSON.stringify(data))));
  }

  getProductsByCategories(category: string): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`https://dummyjson.com/products/category/${category}`)
      .pipe(tap((data) => console.log('All', JSON.stringify(data))));
  }

  getProductsWithPagination(
    limit: number,
    skip: number
  ): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      )
      .pipe(tap((data) => console.log('All', JSON.stringify(data))));
  }
}
