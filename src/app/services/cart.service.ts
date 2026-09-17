import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();

  readonly totalItems = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));

  readonly totalPrice = computed(() =>
    this.items().reduce((sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity, 0),
  );

  addItem(product: Product, quantity: number = 1): void {
    if (this.isInCart(product.id)) {
      this.items.update((items) =>
        items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        ),
      );
    } else {
      this.items.update((items) => [...items, { product, quantity }]);
    }
  }

  removeItem(productId: number): void {
    this.items.update((items) => items.filter((i) => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(productId);
      return;
    }

    this.items.update((items) =>
      items.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }

  clearCart(): void {
    this.items.set([]);
  }

  isInCart(productId: number): boolean {
    return this.items().some((i) => i.product.id === productId);
  }
}
