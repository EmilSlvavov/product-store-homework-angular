import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-hero-banner',
  styleUrl: './hero-banner.css',
  templateUrl: './hero-banner.html',
})
export class HeroBanner {
  @Input() announcement: string = 'Default';

  headline: string = 'UP TO 70% OFF';
  subtitle: string = 'for new products';

  @Output() ctaClicked = new EventEmitter<string>();

  onCtaClick(): void {
    this.ctaClicked.emit('Shop now');
  }
}
