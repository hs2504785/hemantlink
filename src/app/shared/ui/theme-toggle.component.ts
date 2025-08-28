import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  template: `
    <button class="theme-toggle" (click)="toggleTheme()" [title]="getButtonTitle()" type="button">
      <i [class]="getCurrentThemeIcon() + ' icon-colorful'"></i>
    </button>
  `,
  styles: [
    `
      .theme-toggle {
        position: fixed;
        top: 1rem;
        right: 1rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.9);

        [data-theme='dark'] & {
          background: rgba(42, 42, 42, 0.9);
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme='purple'] & {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(156, 39, 176, 0.2);
        }
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        [data-theme='dark'] & {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        &:hover {
          background: rgba(255, 255, 255, 1);
          border-color: var(--accent);
          transform: scale(1.05);

          [data-theme='dark'] & {
            background: rgba(42, 42, 42, 1);
            border-color: rgba(187, 134, 252, 0.3);
          }

          [data-theme='purple'] & {
            background: rgba(255, 255, 255, 1);
            border-color: rgba(156, 39, 176, 0.4);
          }
        }

        &:focus-visible {
          outline: 3px solid var(--primary-text);
          outline-offset: 3px;
        }

        i {
          font-size: 1.2rem;
          color: var(--accent);
          transition: color 0.2s ease;
        }

        &:hover i {
          color: var(--accent-hover);
        }
      }

      @media (max-width: 768px) {
        .theme-toggle {
          top: 0.75rem;
          right: 0.75rem;
          width: 2.5rem;
          height: 2.5rem;

          i {
            font-size: 1rem;
          }
        }
      }
    `,
  ],
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getCurrentThemeIcon(): string {
    const themeConfig = this.themeService.getThemeConfig();
    return themeConfig?.icon || 'ti-light-bulb';
  }

  getButtonTitle(): string {
    const themeConfig = this.themeService.getThemeConfig();
    return `Current theme: ${themeConfig?.label || 'Light'}. Click to switch.`;
  }
}
