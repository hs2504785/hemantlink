import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StyleLoaderService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private loadedBundles = new Set<string>();

  /**
   * Load any CSS bundle by name (automatically appends `.min.css`)
   */
  load(bundleName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isBrowser) {
        resolve(); // Skip in SSR
        return;
      }

      // Check if already loaded
      if (this.loadedBundles.has(bundleName)) {
        resolve(); // already loaded
        return;
      }

      try {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${bundleName}.min.css`;
        link.id = `css-${bundleName}`;

        link.onload = () => {
          this.loadedBundles.add(bundleName);
          resolve();
        };
        link.onerror = () => {
          reject(new Error(`Failed to load CSS bundle: ${bundleName}`));
        };

        document.head.appendChild(link);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Remove a previously loaded CSS bundle
   */
  remove(bundleName: string): void {
    if (!this.isBrowser) return;

    try {
      const link = document.getElementById(`css-${bundleName}`);
      if (link) {
        link.remove();
        this.loadedBundles.delete(bundleName);
      }
    } catch {
      // Silently fail if element doesn't exist
    }
  }

  /**
   * Check if a bundle is already loaded
   */
  isLoaded(bundleName: string): boolean {
    return this.loadedBundles.has(bundleName);
  }

  /**
   * Get list of loaded bundles
   */
  getLoadedBundles(): string[] {
    return Array.from(this.loadedBundles);
  }
}
