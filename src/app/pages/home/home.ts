import { Component, inject } from '@angular/core';
import { HeroBanner } from '../../components/hero-banner/hero-banner';
import { Router } from '@angular/router';

@Component({
  imports: [HeroBanner],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private router = inject(Router);

  onHeroCta(label: string): void {
    this.router.navigate(['/products']);
  }
}
