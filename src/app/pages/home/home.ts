import { Component, inject } from '@angular/core';
import { HeroBanner } from '../../components/hero-banner/hero-banner';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  imports: [HeroBanner, ProductCard, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private router = inject(Router);

  private productService = inject(ProductService)

  featured = this.productService.getFeatured()

  categories = this.productService.getCategories().map((name) => ({
    name, count: this.productService.getByCategory(name).length
  }))



  onHeroCta(label: string): void {
    this.router.navigate(['/products']);
  }
}
