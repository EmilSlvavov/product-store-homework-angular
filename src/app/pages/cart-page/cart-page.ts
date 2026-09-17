import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-cart-page',
  styleUrl: './cart-page.css',
  templateUrl: './cart-page.html',
})
export class CartPage {
  protected cart = inject(CartService);

  unitPrice(item: CartItem): number {
    return item.product.salePrice ?? item.product.price;
  }

  lineTotal(item: CartItem): number {
    return this.unitPrice(item) * item.quantity;
  }

  increase(item: CartItem): void {
    this.cart.updateQuantity(item.product.id, Math.min(item.quantity + 1, 10));
  }

  decrease(item: CartItem): void {
    this.cart.updateQuantity(item.product.id, Math.max(item.quantity - 1, 1));
  }

  remove(item: CartItem): void {
    this.cart.removeItem(item.product.id);
  }
}
