import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { ProductListPage } from './pages/product-list-page/product-list-page';
import { ProductDetail } from './pages/product-detail/product-detail';
import { CartPage } from './pages/cart-page/cart-page';
import { ProductReviews } from './pages/product-detail/product-reviews/product-reviews';
import { ProductSpecs } from './pages/product-detail/product-specs/product-specs';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductListPage },
  {
    path: 'products/:id',
    component: ProductDetail,
    children: [
      { path: '', redirectTo: 'specs', pathMatch: 'full' },
      { path: 'specs', component: ProductSpecs },
      { path: 'reviews', component: ProductReviews },
    ],
  },
  { path: 'cart', component: CartPage },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  { path: '**', component: NotFound },
];
