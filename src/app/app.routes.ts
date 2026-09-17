import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { ProductListPage } from './pages/product-list-page/product-list-page';
import { ProductDetail } from './pages/product-detail/product-detail';
import { CartPage } from './pages/cart-page/cart-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductListPage },
  { path: 'products/:id', component: ProductDetail },
  { path: 'cart', component: CartPage },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  { path: '**', component: NotFound },
];
