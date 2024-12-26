import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { Observable } from 'rxjs';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectSingleProduct,
} from '../state/selectors/single-product.selector';
import { loadSingleProduct } from '../state/actions/single-product.actions';
import { selectIsLoading } from '../state/selectors/single-product.selector';
import { ServerErrorComponent } from '../server-error/server-error.component';
import { addToCart } from '../state/actions/cart.actions';

@Component({
  selector: 'app-individual-product',
  standalone: true,
  imports: [CommonModule, CapitalizePipe, ServerErrorComponent],
  templateUrl: './individual-product.component.html',
  styleUrl: './individual-product.component.css',
})
export class IndividualProductComponent implements OnInit {
  product!: IProduct;

  product$!: Observable<IProduct>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  currentimage: string = '';

  constructor(private route: ActivatedRoute, private store: Store) {
    this.product$ = this.store.select(selectSingleProduct);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.store.dispatch(loadSingleProduct({ id: productId }));

    this.product$.subscribe((product) => {
      this.product = product;

      if (product) {
        this.currentimage = product.thumbnail;
      }
    });
  }

  changeImage(image: string): void {
    this.currentimage = image;
  }

  addToCart(product: IProduct): void {
    this.store.dispatch(addToCart({ product }));
    alert('Product has been added to your cart');
  }
}
