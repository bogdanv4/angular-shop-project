import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/services/product.service';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individual-product',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './individual-product.component.html',
  styleUrl: './individual-product.component.css',
})
export class IndividualProductComponent implements OnInit {
  product!: IProduct;
  errorMessage = '';
  sub!: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.sub = this.productService.getSingleProduct(productId).subscribe({
      next: (product: IProduct) => {
        this.product = product;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
