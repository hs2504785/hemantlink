import { Component, inject } from '@angular/core';
import { ProfileComponent } from './features/profile/profile.component';
import { LinksComponent } from './features/links/links.component';
import { ThemeToggleComponent } from './shared/ui/theme-toggle.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileComponent, LinksComponent, ThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private themeService = inject(ThemeService);

  constructor() {
    // Configure theme caching based on your needs
    this.configureThemeCaching();
  }

  private configureThemeCaching(): void {
    // Choose your caching strategy:

    // 1. CACHE: Best for small files (<5KB) - Current setup
    // this.themeService.configureCaching({
    //   strategy: 'cache', // Keep all themes cached
    //   preloadAllThemes: true, // Preload for instant switching
    // });

    // Uncomment one of these alternatives if needed:

    /* 
    // 2. CONSERVATIVE: Best for large files (>10KB)
    this.themeService.configureCaching({
      strategy: 'conservative',  // Remove previous theme to save memory
      preloadAllThemes: false,   // Load on-demand only
    });
    */

    // 3. HYBRID: Smart caching based on file size
    this.themeService.configureCaching({
      strategy: 'hybrid', // Auto-decide based on file size
      preloadAllThemes: false, // Preload manually if needed
      sizeThreshold: 10, // 10KB threshold
    });
  }
}
