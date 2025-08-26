import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  template: `
    <div
      class="card"
      [class.h-100]="fullHeight"
      [class.shadow-lg]="elevated"
      [class.border-0]="noBorder"
      [class.border]="outlined"
      [class.shadow-sm]="outlined"
    >
      @if (title) {
      <div class="card-header" [class.bg-transparent]="!headerBg">
        <h5 class="card-title mb-0">{{ title }}</h5>
        @if (subtitle) {
        <h6 class="card-subtitle text-muted mt-1">{{ subtitle }}</h6>
        }
      </div>
      }
      <div class="card-body" [class]="bodyClass">
        @if (title && !hasHeader) {
        <h5 class="card-title mb-3">{{ title }}</h5>
        } @if (subtitle && !hasHeader) {
        <h6 class="card-subtitle mb-2 text-muted">{{ subtitle }}</h6>
        }
        <ng-content></ng-content>
      </div>
      @if (hasFooter) {
      <div class="card-footer bg-transparent border-top-0">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .card {
        transition: var(--transition);
        border-color: var(--border-color);
        background-color: transparent;
      }

      /* Themed shadow on hover for outlined cards */
      .card.border:hover {
        border-color: var(--accent);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }

      .card-title {
        color: var(--primary-text);
        font-weight: 600;
      }

      .card-subtitle {
        color: var(--secondary-text);
      }
    `,
  ],
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() bodyClass: string = 'p-4';
  @Input() fullHeight: boolean = false;
  @Input() elevated: boolean = false;
  @Input() outlined: boolean = false;
  @Input() noBorder: boolean = false;
  @Input() hasFooter: boolean = false;
  @Input() hasHeader: boolean = false;
  @Input() headerBg: boolean = false;
}
