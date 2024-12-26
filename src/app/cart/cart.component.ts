import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { Store } from '@ngrx/store';
import { selectCartProducts } from '../state/selectors/cart.selector';
import {
  loadCart,
  removeFromCart,
  updateProductQuantity,
} from '../state/actions/cart.actions';
import { NoDataComponent } from '../no-data/no-data.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NoDataComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  quantity: number = 1;

  cartProducts$!: Observable<IProduct[]>;

  constructor(private store: Store) {
    this.cartProducts$ = this.store.select(selectCartProducts);

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length > 0) {
      const initializedCart = savedCart.map((product: IProduct) => ({
        ...product,
        quantity: product.quantity ?? 1,
      }));
      this.store.dispatch(loadCart({ products: initializedCart }));
    }
  }

  increaseQuantity(product: IProduct): void {
    const currentQuantity = product.quantity ?? 1;
    this.store.dispatch(
      updateProductQuantity({
        productId: product.id,
        quantity: currentQuantity + 1,
      })
    );
  }

  decreaseQuantity(product: IProduct): void {
    const currentQuantity = product.quantity ?? 1;
    if (currentQuantity > 1) {
      this.store.dispatch(
        updateProductQuantity({
          productId: product.id,
          quantity: currentQuantity - 1,
        })
      );
    }
  }

  removeProduct(productId: number): void {
    this.store.dispatch(removeFromCart({ productId }));
  }

  calculateTotal(): number {
    let total = 0;
    this.cartProducts$.subscribe((products) => {
      total = products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
    });
    return total;
  }
}
