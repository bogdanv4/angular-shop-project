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
    return this.http.get<IProduct[]>(this.urlProducts).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getSingleProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`https://dummyjson.com/products/${id}`).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // getCategories(): Observable<string[]> {
  //   return this.http.get<string[]>(this.urlCategories).pipe(
  //     tap((data) => console.log('All', JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  getProductsByCategories(category: string): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`https://dummyjson.com/products/category/${category}`)
      .pipe(
        tap((data) => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProductsWithPagination(
    limit: number,
    skip: number
  ): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      )
      .pipe(
        tap((data) => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  // getProductsWithPagination(limit: number, skip: number): Observable<any> {
  //   return this.http.get<any>(
  //     `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  //   );
  // }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.urlCategories);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}
