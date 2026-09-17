import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-checkout-placeholder',
  styleUrl: './checkout-placeholder.css',
  templateUrl: './checkout-placeholder.html',
})
export class CheckoutPlaceholder {
  protected cart = inject(CartService);
}
