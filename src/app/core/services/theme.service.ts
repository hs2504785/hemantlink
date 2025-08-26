import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { 
  ThemeMode, 
  ThemeConfig, 
  THEME_STORAGE_KEY, 
  DEFAULT_THEME_CONFIG 
} from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Reactive signals for theme state
  public readonly currentTheme = signal<ThemeMode>('light');
  public readonly systemPreference = signal<boolean>(false);

  constructor() {
    this.initializeTheme();
    
    // Effect to apply theme changes to DOM
    effect(() => {
      if (this.isBrowser) {
        this.applyTheme(this.currentTheme());
      }
    });

    // Listen for system theme changes
    if (this.isBrowser && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (this.systemPreference()) {
          this.currentTheme.set(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /**
   * Initialize theme from localStorage or system preference
   */
  private initializeTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      const config: ThemeConfig = stored 
        ? JSON.parse(stored) 
        : DEFAULT_THEME_CONFIG;

      this.systemPreference.set(config.systemPreference);

      if (config.systemPreference) {
        // Use system preference
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme.set(systemDark ? 'dark' : 'light');
      } else {
        // Use stored theme
        this.currentTheme.set(config.mode);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      this.currentTheme.set(DEFAULT_THEME_CONFIG.mode);
    }
  }

  /**
   * Set a specific theme mode
   */
  public setTheme(mode: ThemeMode): void {
    this.currentTheme.set(mode);
    this.systemPreference.set(false);
    this.saveThemeConfig();
  }

  /**
   * Toggle between light and dark themes
   */
  public toggleTheme(): void {
    const current = this.currentTheme();
    const next: ThemeMode = current === 'light' ? 'dark' : 
                           current === 'dark' ? 'purple' : 'light';
    this.setTheme(next);
  }

  /**
   * Enable system preference for theme
   */
  public useSystemPreference(): void {
    this.systemPreference.set(true);
    
    if (this.isBrowser && window.matchMedia) {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentTheme.set(systemDark ? 'dark' : 'light');
    }
    
    this.saveThemeConfig();
  }

  /**
   * Get current theme configuration
   */
  public getThemeConfig(): ThemeConfig {
    return {
      mode: this.currentTheme(),
      systemPreference: this.systemPreference()
    };
  }

  /**
   * Apply theme to DOM by setting data-theme attribute
   */
  private applyTheme(theme: ThemeMode): void {
    if (!this.isBrowser) return;

    const html = document.documentElement;
    
    // Remove existing theme attributes
    html.removeAttribute('data-theme');
    
    // Set new theme (only for non-light themes)
    if (theme !== 'light') {
      html.setAttribute('data-theme', theme);
    }

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme);
  }

  /**
   * Update meta theme-color for mobile browser UI
   */
  private updateMetaThemeColor(theme: ThemeMode): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    const colors = {
      light: '#ffffff',
      dark: '#121212',
      purple: '#f3e5f5'
    };

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', colors[theme]);
    } else {
      // Create meta tag if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = colors[theme];
      document.head.appendChild(meta);
    }
  }

  /**
   * Save current theme configuration to localStorage
   */
  private saveThemeConfig(): void {
    if (!this.isBrowser) return;

    try {
      const config: ThemeConfig = {
        mode: this.currentTheme(),
        systemPreference: this.systemPreference()
      };
      
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }

  /**
   * Get CSS custom property value for current theme
   */
  public getCSSProperty(property: string): string {
    if (!this.isBrowser) return '';
    
    return getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim();
  }

  /**
   * Check if current theme is dark mode
   */
  public isDarkMode(): boolean {
    return this.currentTheme() === 'dark';
  }

  /**
   * Check if current theme is purple mode
   */
  public isPurpleMode(): boolean {
    return this.currentTheme() === 'purple';
  }

  /**
   * Check if using system preference
   */
  public isUsingSystemPreference(): boolean {
    return this.systemPreference();
  }
}
