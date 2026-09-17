import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';

@Component({
  imports: [Header, Footer, RouterOutlet, Breadcrumb],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
