import { Component, Input, OnInit } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header implements OnInit {


  ngOnInit(): void {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      this.isDarkMode = true
      document.body.classList.add("dark-mode")
    }
  }
  @Input() cartCount: number = 0;

  isDarkMode: boolean = false;

  toggleTheme(): void {
    document.body.classList.toggle('dark-mode');
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
}
