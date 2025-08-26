import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, NgIf],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="buttonClasses"
      (click)="onClick()"
      class="btn-theme"
    >
      <i *ngIf="icon && iconPosition === 'left'" [class]="iconClass"></i>
      <span *ngIf="loading" class="spinner-border spinner-border-sm me-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </span>
      <ng-content></ng-content>
      <i *ngIf="icon && iconPosition === 'right'" [class]="iconClass"></i>
    </button>
  `,
  styles: [`
    .btn-theme {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 500;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      border: 1px solid transparent;
      transition: var(--transition);
      
      &:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
      }
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
      }
    }
    
    .btn-primary {
      background-color: var(--accent);
      border-color: var(--accent);
      color: white;
      
      &:hover:not(:disabled) {
        background-color: var(--accent-hover);
        border-color: var(--accent-hover);
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }
    }
    
    .btn-secondary {
      background-color: var(--secondary-bg);
      border-color: var(--border-color);
      color: var(--primary-text);
      
      &:hover:not(:disabled) {
        background-color: var(--accent);
        color: white;
        transform: translateY(-2px);
      }
    }
    
    .btn-outline {
      background-color: transparent;
      border-color: var(--accent);
      color: var(--accent);
      
      &:hover:not(:disabled) {
        background-color: var(--accent);
        color: white;
        transform: translateY(-2px);
      }
    }
    
    .btn-ghost {
      background-color: transparent;
      border-color: transparent;
      color: var(--primary-text);
      
      &:hover:not(:disabled) {
        background-color: var(--secondary-bg);
        transform: translateY(-1px);
      }
    }
    
    .btn-link {
      background-color: transparent;
      border-color: transparent;
      color: var(--accent);
      text-decoration: underline;
      
      &:hover:not(:disabled) {
        color: var(--accent-hover);
        text-decoration: none;
      }
    }
    
    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      border-radius: calc(var(--border-radius) * 0.75);
    }
    
    .btn-md {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      border-radius: var(--border-radius);
    }
    
    .btn-lg {
      padding: 1rem 2rem;
      font-size: 1.125rem;
      border-radius: calc(var(--border-radius) * 1.25);
    }
    
    .btn-full {
      width: 100%;
    }
    
    .spinner-border-sm {
      width: 1rem;
      height: 1rem;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  
  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string {
    const classes = [
      `btn-${this.variant}`,
      `btn-${this.size}`
    ];
    
    if (this.fullWidth) {
      classes.push('btn-full');
    }
    
    return classes.join(' ');
  }

  get iconClass(): string {
    return this.icon || '';
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
