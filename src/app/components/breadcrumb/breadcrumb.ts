import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

interface Crumb {
  label: string;
  url: string;
}

@Component({
  imports: [RouterLink],
  selector: 'app-breadcrumb',
  styleUrl: './breadcrumb.css',
  templateUrl: './breadcrumb.html',
})
export class Breadcrumb {
  private router = inject(Router);
  private productService = inject(ProductService);

  private url = signal(this.router.url);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url.set(event.urlAfterRedirects);
      }
    });
  }

  crumbs = computed((): Crumb[] => {
    const path = this.url().split('?')[0];
    const segments = path.split('/').filter(Boolean);

    const trail: Crumb[] = [{ label: 'Home', url: '/' }];

    if (segments[0] === 'products') {
      trail.push({ label: 'Products', url: '/products' });

      if (segments[1]) {
        const product = this.productService.getById(Number(segments[1]));
        trail.push({
          label: product?.name ?? 'Product not found',
          url: `/products/${segments[1]}`,
        });
      }
    }

    return trail;
  });
}
