import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { StarRating } from '../../components/star-rating/star-rating';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  imports: [RouterLink, StarRating, RouterOutlet, RouterLinkActive],
  selector: 'app-product-detail',
  styleUrl: './product-detail.css',
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  protected cart = inject(CartService);

  private productId = signal(Number(this.route.snapshot.params['id']));

  product = computed(() => this.productService.getById(this.productId()));

  related = computed(() => {
    const p = this.product();
    return p ? this.productService.getRelated(p) : [];
  });

  views = ['Front', 'Side', 'Back'];
  selectedView = signal(0);
  quantity = signal(1);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.productId.set(Number(params.get('id')));
      this.selectedView.set(0);
      this.quantity.set(1);
    });
  }

  selectView(index: number): void {
    this.selectedView.set(index);
  }

  increase(): void {
    this.quantity.update((q) => Math.min(q + 1, 10));
  }

  decrease(): void {
    this.quantity.update((q) => Math.max(q - 1, 1));
  }

  addToCart(product: Product): void {
    this.cart.addItem(product, this.quantity());
  }
}
