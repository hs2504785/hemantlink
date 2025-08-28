import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StyleLoaderService } from './style-loader.service';

export type ThemeMode = 'light' | 'dark' | 'purple';

export interface ThemeConfig {
  value: ThemeMode;
  label: string;
  icon: string;
}

export type ThemeCacheStrategy = 'cache' | 'conservative' | 'hybrid';

export interface ThemeCacheConfig {
  /** Caching strategy for theme CSS files */
  strategy: ThemeCacheStrategy;
  /** Auto-preload all themes on app start (default: false) */
  preloadAllThemes: boolean;
  /** File size threshold in KB for hybrid strategy decisions (default: 5KB) */
  sizeThreshold: number;
}

const THEME_CONFIGS: Record<ThemeMode, ThemeConfig> = {
  light: { value: 'light', label: 'Light', icon: 'ti-light-bulb' },
  dark: { value: 'dark', label: 'Dark', icon: 'ti-eye' },
  purple: { value: 'purple', label: 'Purple', icon: 'ti-palette' },
};

const DEFAULT_CACHE_CONFIG: ThemeCacheConfig = {
  strategy: 'cache', // Cache all themes (perfect for small files)
  preloadAllThemes: false, // Load on-demand by default
  sizeThreshold: 5, // 5KB threshold for hybrid decisions
};

/**
 * Theme caching strategies explained:
 *
 * 'cache': Cache all themes permanently (best for small files <5KB)
 *   - Themes load once and stay in memory
 *   - Instant theme switching after first load
 *   - Higher memory usage but better UX
 *
 * 'conservative': Remove previous theme when switching (best for large files >10KB)
 *   - Only one theme CSS in memory at a time
 *   - Lower memory usage but slower switching
 *   - HTTP request on every theme change
 *
 * 'hybrid': Smart caching based on file size threshold
 *   - Small themes: cached permanently
 *   - Large themes: removed when switching
 *   - Automatic optimization based on sizeThreshold
 */

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly styleLoader = inject(StyleLoaderService);

  // Reactive signal for current theme
  public readonly currentTheme = signal<ThemeMode>('light');

  // Cache configuration
  private cacheConfig: ThemeCacheConfig = DEFAULT_CACHE_CONFIG;

  constructor() {
    if (this.isBrowser) {
      this.initTheme();
      // Auto-preload themes if configured
      if (this.cacheConfig.preloadAllThemes) {
        this.preloadAllThemes();
      }
    }
  }

  /**
   * Set a specific theme - respects caching strategy
   */
  setTheme(theme: ThemeMode): Promise<void> {
    return new Promise((resolve) => {
      const current = this.currentTheme();

      // Decide whether to remove previous theme based on strategy
      const shouldRemovePrevious = this.shouldRemovePreviousTheme();
      if (shouldRemovePrevious && current !== 'light') {
        this.styleLoader.remove(current);
      }

      // Apply theme immediately to prevent flicker
      this.applyThemeToDOM(theme);
      this.currentTheme.set(theme);
      this.saveTheme(theme);

      // For light theme, no CSS loading needed
      if (theme === 'light') {
        resolve();
        return;
      }

      // For other themes, load CSS in background
      this.styleLoader
        .load(theme)
        .then(() => resolve())
        .catch(() => resolve());
    });
  }

  /**
   * Toggle between themes: light → dark → purple → light
   */
  toggleTheme(): Promise<void> {
    const current = this.currentTheme();
    const next: ThemeMode = current === 'light' ? 'dark' : current === 'dark' ? 'purple' : 'light';
    return this.setTheme(next);
  }

  /**
   * Initialize theme from localStorage
   */
  private initTheme(): void {
    if (!this.isBrowser) return;

    try {
      const saved = (localStorage.getItem('theme') as ThemeMode) ?? 'light';
      this.setTheme(saved);
    } catch {
      this.setTheme('light');
    }
  }

  /**
   * Apply theme to DOM by setting data-theme attribute
   */
  private applyThemeToDOM(theme: ThemeMode): void {
    if (!this.isBrowser) return;

    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: ThemeMode): void {
    if (!this.isBrowser) return;

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  /**
   * Get theme configuration for UI
   */
  getThemeConfig(): ThemeConfig {
    return THEME_CONFIGS[this.currentTheme()];
  }

  /**
   * Configure theme caching behavior
   */
  configureCaching(config: Partial<ThemeCacheConfig>): void {
    this.cacheConfig = { ...this.cacheConfig, ...config };
  }

  /**
   * Get current cache configuration
   */
  getCacheConfig(): ThemeCacheConfig {
    return { ...this.cacheConfig };
  }

  /**
   * Determine if previous theme should be removed based on strategy
   */
  private shouldRemovePreviousTheme(): boolean {
    switch (this.cacheConfig.strategy) {
      case 'cache':
        return false; // Keep all themes cached
      case 'conservative':
        return true; // Remove previous theme to save memory
      case 'hybrid':
        // TODO: In a real app, you could check actual file sizes here
        // For now, assume small files based on sizeThreshold
        return false; // Current theme files are small, so cache them
      default:
        return false;
    }
  }

  /**
   * Preload all theme CSS files for instant switching
   * Only preloads if strategy allows caching
   */
  preloadAllThemes(): Promise<void> {
    if (this.cacheConfig.strategy === 'conservative') {
      return Promise.resolve(); // Skip preloading for conservative strategy
    }

    const themesToPreload: ThemeMode[] = ['dark', 'purple'];

    return Promise.all(themesToPreload.map((theme) => this.styleLoader.load(theme))).then(() => {
      // All themes cached
    });
  }

  /**
   * Clear all cached theme CSS files
   */
  clearThemeCache(): void {
    const themesToClear: ThemeMode[] = ['dark', 'purple'];
    themesToClear.forEach((theme) => {
      this.styleLoader.remove(theme);
    });
  }
}
