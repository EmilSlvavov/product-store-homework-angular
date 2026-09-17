import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { StarRating } from '../star-rating/star-rating';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { RelativeTimePipe } from '../../pipes/relative-time-pipe';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [FormsModule, StarRating, TruncatePipe, RelativeTimePipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input() product!: Product;

  protected cart = inject(CartService);

  quantity: number = 1;

  get discountPercent(): number {
    if (!this.product.salePrice) {
      return 0;
    }
    return Math.round((1 - this.product.salePrice / this.product.price) * 100);
  }

  onQuantityChange(value: number): void {
    const n = Number(value);

    if (!n || n < 1) {
      this.quantity = 1;
    } else if (n > 10) {
      this.quantity = 10;
    } else {
      this.quantity = Math.floor(n);
    }
  }

  onAddToCart(): void {
    this.cart.addItem(this.product, this.quantity);
  }
}
