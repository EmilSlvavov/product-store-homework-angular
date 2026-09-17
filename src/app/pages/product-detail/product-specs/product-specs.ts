import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  imports: [],
  selector: 'app-product-specs',
  styleUrl: './product-specs.css',
  templateUrl: './product-specs.html',
})
export class ProductSpecs {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  private productId = signal(Number(this.route.parent!.snapshot.params['id']));

  constructor() {
    this.route.parent!.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.productId.set(Number(params.get('id')));
    });
  }

  specs = computed(() => {
    const product = this.productService.getById(this.productId());

    if (!product) {
      return [];
    }

    return Object.entries(product.specs).map(([label, value]) => ({ label, value }));
  });
}
