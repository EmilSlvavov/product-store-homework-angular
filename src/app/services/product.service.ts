import { Injectable } from '@angular/core';
import { Product } from '../models/product';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function ago(ms: number): Date {
  return new Date(Date.now() - ms);
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAll(): Product[] {
    return [...this.products];
  }

  getById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getByCategory(category: string): Product[] {
    return this.products.filter((p) => p.category === category);
  }

  getRelated(product: Product): Product[] {
    return product.relatedIds
      .map((id) => this.getById(id))
      .filter((p): p is Product => p !== undefined);
  }

  getCategories(): string[] {
    return [...new Set(this.products.map((p) => p.category))];
  }

  search(term: string): Product[] {
    const t = term.trim().toLowerCase();

    if (!t) {
      return this.getAll();
    }

    return this.products.filter((p) => p.name.toLowerCase().includes(t) || p.description.toLowerCase().includes(t));
  }

  getFeatured(): Product[] {
    return [...this.products].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 4);
  }

  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Laptop Pro 14',
      category: 'Electronics',
      price: 1299,
      inStock: true,
      description: 'Thin-and-light 14" laptop with an all-day battery.',
      rating: 5,
      reviewCount: 128,
      dateAdded: ago(2 * DAY),
      specs: {
        Processor: 'M4 Pro',
        Memory: '18 GB',
        Storage: '512 GB SSD',
        Display: '14.2" Liquid Retina',
      },
      relatedIds: [2, 3, 11],
    },
    {
      id: 2,
      name: '4K Monitor 27"',
      category: 'Electronics',
      price: 449,
      salePrice: 379,
      inStock: true,
      description: 'Colour-accurate 27-inch display for work and play.',
      rating: 4,
      reviewCount: 64,
      dateAdded: ago(5 * DAY),
      specs: {
        Resolution: '3840 × 2160',
        Panel: 'IPS',
        'Refresh rate': '60 Hz',
        Ports: 'USB-C, HDMI 2.0',
      },
      relatedIds: [1, 11, 12],
    },
    {
      id: 3,
      name: 'Mechanical Keyboard',
      category: 'Electronics',
      price: 129,
      inStock: false,
      description: 'Hot-swappable switches with a compact 75% layout.',
      rating: 4,
      reviewCount: 41,
      dateAdded: ago(1 * DAY),
      specs: {
        Layout: '75%',
        Switches: 'Hot-swappable',
        Connection: 'USB-C / Bluetooth',
        Backlight: 'RGB',
      },
      relatedIds: [1, 2, 11],
    },
    {
      id: 4,
      name: 'Noise-Cancelling Headphones',
      category: 'Audio',
      price: 299,
      salePrice: 229,
      inStock: true,
      description: 'Over-ear headphones with 30 hours of playback.',
      rating: 5,
      reviewCount: 210,
      dateAdded: ago(6 * HOUR),
      specs: {
        'Battery life': '30 hours',
        'Noise cancelling': 'Adaptive',
        Weight: '250 g',
        Connection: 'Bluetooth 5.3',
      },
      relatedIds: [5, 9, 1],
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      category: 'Audio',
      price: 89,
      inStock: true,
      description: 'Pocket-sized speaker that is splash-proof and loud.',
      rating: 4,
      reviewCount: 87,
      dateAdded: ago(10 * DAY),
      specs: {
        'Battery life': '12 hours',
        'Water resistance': 'IP67',
        Output: '10 W',
        Weight: '310 g',
      },
      relatedIds: [4, 9, 10],
    },
    {
      id: 6,
      name: 'Espresso Machine',
      category: 'Home',
      price: 549,
      inStock: true,
      description: 'Dual-boiler machine with a built-in grinder.',
      rating: 4,
      reviewCount: 33,
      dateAdded: ago(3 * DAY),
      specs: {
        Boilers: 'Dual',
        Grinder: 'Built-in conical burr',
        Pressure: '15 bar',
        'Water tank': '2 L',
      },
      relatedIds: [7, 10, 5],
    },
    {
      id: 7,
      name: 'Robot Vacuum',
      category: 'Home',
      price: 399,
      inStock: false,
      description: 'Maps your floors and empties itself for 60 days.',
      rating: 3,
      reviewCount: 19,
      dateAdded: ago(20 * DAY),
      specs: {
        Navigation: 'LiDAR mapping',
        'Run time': '150 min',
        'Self-empty': '60 days',
        Suction: '4000 Pa',
      },
      relatedIds: [6, 10, 5],
    },
    {
      id: 8,
      name: 'Leather Laptop Sleeve',
      category: 'Accessories',
      price: 59,
      inStock: true,
      description: 'Full-grain leather sleeve with a felt lining.',
      rating: 4,
      reviewCount: 52,
      dateAdded: ago(30 * MINUTE),
      specs: {
        Material: 'Full-grain leather',
        Lining: 'Wool felt',
        Fits: 'Up to 14"',
        Colour: 'Tan',
      },
      relatedIds: [1, 11, 12],
    },
    {
      id: 9,
      name: 'Wireless Earbuds',
      category: 'Audio',
      price: 149,
      salePrice: 119,
      inStock: true,
      description: 'Compact earbuds with a wireless charging case.',
      rating: 4,
      reviewCount: 176,
      dateAdded: ago(4 * DAY),
      specs: {
        'Battery life': '8 h (32 h with case)',
        'Water resistance': 'IPX4',
        Charging: 'Qi wireless',
        Connection: 'Bluetooth 5.3',
      },
      relatedIds: [4, 5, 11],
    },
    {
      id: 10,
      name: 'Smart Desk Lamp',
      category: 'Home',
      price: 79,
      inStock: true,
      description: 'Dimmable LED lamp with adjustable colour temperature.',
      rating: 4,
      reviewCount: 58,
      dateAdded: ago(45 * MINUTE),
      specs: {
        Brightness: '1000 lm',
        'Colour temperature': '2700–6500 K',
        Control: 'Touch and app',
        Power: '12 W',
      },
      relatedIds: [6, 7, 12],
    },
    {
      id: 11,
      name: 'USB-C Hub',
      category: 'Accessories',
      price: 49,
      inStock: true,
      description: 'Seven-port hub with 4K HDMI and 100 W pass-through.',
      rating: 4,
      reviewCount: 142,
      dateAdded: ago(8 * DAY),
      specs: {
        Ports: '7',
        HDMI: '4K at 60 Hz',
        'Power delivery': '100 W',
        'Card reader': 'SD / microSD',
      },
      relatedIds: [1, 2, 12],
    },
    {
      id: 12,
      name: 'Aluminium Laptop Stand',
      category: 'Accessories',
      price: 69,
      inStock: true,
      description: 'Height-adjustable stand that folds flat for travel.',
      rating: 5,
      reviewCount: 95,
      dateAdded: ago(12 * HOUR),
      specs: {
        Material: 'Anodised aluminium',
        'Height range': '5–25 cm',
        'Max load': '10 kg',
        Weight: '650 g',
      },
      relatedIds: [1, 8, 11],
    },
  ];
}
