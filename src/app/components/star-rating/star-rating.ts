import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-star-rating',
  styleUrl: './star-rating.css',
  templateUrl: './star-rating.html',
})
export class StarRating {
  rating = input(0);
  reviewCount = input(0);
  readonly = input(true);

  ratingChange = output<number>();

  stars: number[] = [1, 2, 3, 4, 5];
  hoveredRating: number = 0;

  onEnter(star: number): void {
    if (!this.readonly()) {
      this.hoveredRating = star;
    }
  }

  onLeave(): void {
    this.hoveredRating = 0;
  }

  onStarClick(star: number): void {
    if (!this.readonly()) {
      this.ratingChange.emit(star);
    }
  }

  isFilled(star: number): boolean {
    const active = this.hoveredRating || this.rating();
    return star <= active;
  }
}
