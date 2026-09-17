export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  inStock: boolean;
  description: string;
  rating: number;
  reviewCount: number;
  dateAdded: Date;
  specs: Record<string, string>;
  relatedIds: number[];
}
