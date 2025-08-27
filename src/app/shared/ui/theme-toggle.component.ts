import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { AVAILABLE_THEMES } from '../../core/models/theme.model';

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
        border: 2px solid var(--accent);
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);

        [data-theme='dark'] & {
          background-color: rgba(42, 42, 42, 0.9);
        }

        [data-theme='purple'] & {
          background-color: rgba(255, 255, 255, 0.95);
        }
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-xl);

        &:hover {
          background-color: rgba(255, 255, 255, 1);
          border-color: var(--accent-hover);
          transform: scale(1.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

          [data-theme='dark'] & {
            background-color: rgba(42, 42, 42, 1);
          }

          [data-theme='purple'] & {
            background-color: rgba(255, 255, 255, 1);
          }
        }

        &:focus-visible {
          outline: 3px solid var(--primary-text);
          outline-offset: 3px;
        }

        i {
          font-size: 1.25rem;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
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
    const currentTheme = this.themeService.currentTheme();
    const themeConfig = AVAILABLE_THEMES.find((theme) => theme.value === currentTheme);
    return themeConfig?.icon || 'ti-sun';
  }

  getButtonTitle(): string {
    const currentTheme = this.themeService.currentTheme();
    const themeConfig = AVAILABLE_THEMES.find((theme) => theme.value === currentTheme);
    return `Current theme: ${themeConfig?.label || 'Light'}. Click to switch.`;
  }
}
