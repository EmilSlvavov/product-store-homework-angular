import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header implements OnInit {

  protected cart = inject(CartService);


  ngOnInit(): void {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
  }

  isDarkMode: boolean = false;

  toggleTheme(): void {
    document.body.classList.toggle('dark-mode');
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
}
