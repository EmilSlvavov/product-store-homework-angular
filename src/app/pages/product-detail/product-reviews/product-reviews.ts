import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-product-reviews',
  styleUrl: './product-reviews.css',
  templateUrl: './product-reviews.html',
})
export class ProductReviews {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  private productId = signal(Number(this.route.parent!.snapshot.params['id']));

  constructor() {
    this.route.parent!.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.productId.set(Number(params.get('id')));
    });
  }

  reviewCount = computed(() => this.productService.getById(this.productId())?.reviewCount ?? 0);
}
