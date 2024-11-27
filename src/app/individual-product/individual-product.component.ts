import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectSingleProduct } from '../state/selectors/single-product.selector';
import { loadSingleProduct } from '../state/actions/single-product.actions';

@Component({
  selector: 'app-individual-product',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './individual-product.component.html',
  styleUrl: './individual-product.component.css',
})
export class IndividualProductComponent implements OnInit {
  product!: IProduct;

  product$!: Observable<IProduct>;

  currentimage: string = '';

  constructor(private route: ActivatedRoute, private store: Store) {
    this.product$ = this.store.select(selectSingleProduct);
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
}
