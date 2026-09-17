import { Component, inject, signal } from '@angular/core';
import { Header } from './components/header/header';
import { HeroBanner } from './components/hero-banner/hero-banner';
import { ProductCard } from './components/product-card/product-card';
import { Product } from './models/product';
import { Footer } from './components/footer/footer';
import { DiscountPipe } from './pipes/discount-pipe';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';

@Component({
  imports: [Header, HeroBanner, ProductCard, Footer, DiscountPipe, CurrencyPipe, FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('product-store');

  private productService = inject(ProductService)

  isLoading = signal(true);

  constructor() {
    setTimeout(() => this.isLoading.set(false), 1000);
  }

  get skeletonCards(): number[] {
    return Array.from({ length: this.pageSize }, (_, i) => i);
  }

  searchTerm: string = '';
  debouncedSearchTerm = signal('');
  searchTimeout: ReturnType<typeof setTimeout> | undefined;

  selectedCategory: string = 'All';
  inStockOnly: boolean = false;
  sortBy: string = '';

  pageSize: number = 6;
  currentPage: number = 1;

  goToPage(page: number): void {
    this.currentPage = page;
  }

  selectCategory(name: string): void {
    this.selectedCategory = name;
    this.currentPage = 1;
  }

  toggleInStockOnly(): void {
    this.inStockOnly = !this.inStockOnly;
    this.currentPage = 1;
  }

  onSearchChange(): void {
    this.currentPage = 1;
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.debouncedSearchTerm.set(this.searchTerm);
    }, 300);
  }

  clearSearch(): void {
    this.currentPage = 1;
    clearTimeout(this.searchTimeout);
    this.searchTerm = '';
    this.debouncedSearchTerm.set('');
  }

  get filteredProducts(): Product[] {
    const term = this.debouncedSearchTerm().trim().toLowerCase();

    return this.allProducts.filter((p) => {
      const matchesSearch =
        !term || p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);

      const matchesCategory =
        this.selectedCategory === 'All' || p.category === this.selectedCategory;

      const matchesStock = !this.inStockOnly || p.inStock;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }

  clearAllFilters(): void {
    clearTimeout(this.searchTimeout);
    this.searchTerm = '';
    this.debouncedSearchTerm.set('');
    this.selectedCategory = 'All';
    this.inStockOnly = false;
    this.currentPage = 1;
  }

  get sortedProducts(): Product[] {
    const products = [...this.filteredProducts];

    switch (this.sortBy) {
      case 'price-asc':
        return products.sort((a, b) => this.effectivePrice(a) - this.effectivePrice(b));
      case 'price-desc':
        return products.sort((a, b) => this.effectivePrice(b) - this.effectivePrice(a));
      case 'name-asc':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      case 'rating-desc':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  }

  effectivePrice(p: Product): number {
    return p.salePrice ?? p.price;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.sortedProducts.slice(start, start + this.pageSize);
  }

  get categories(): { name: string; count: number }[] {
    const cats = new Map<string, number>();

    this.allProducts.forEach((p) => cats.set(p.category, (cats.get(p.category) || 0) + 1));

    return [
      { name: 'All', count: this.allProducts.length },
      ...Array.from(cats, ([name, count]) => ({ name, count })),
    ];
  }

  onHeroCta(label: string): void {
    console.log('Hero CTA clicked:', label);
  }

  get categoryCounts(): { category: string; count: number }[] {
    const counts: Record<string, number> = {};

    for (const p of this.filteredProducts) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    }

    return Object.entries(counts).map(([category, count]) => ({ category, count }));
  }

  allProducts: Product[] = this.productService.getAll()
}
