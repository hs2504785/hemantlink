import { Component, Input, computed } from '@angular/core';
import {
  getActiveLinks,
  getLinksByCategory,
  trackLinkClick,
  type LinkConfig,
} from '../../core/config/profile.config';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [],
  template: `
    <div class="links-container">
      @if (hasLinks()) {
      <!-- Links List -->
      <div class="links-list">
        @for (link of displayLinks(); track link.id) {
        <div class="link-item-wrapper">
          <a
            [href]="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="link-item"
            [class.link-disabled]="!link.isActive"
            (click)="onLinkClick(link, $event)"
          >
            <!-- Link Icon -->
            <div class="link-icon">
              <i [class]="(link.icon || 'ti-link') + ' icon-colorful'"></i>
            </div>

            <!-- Link Content -->
            <div class="link-content">
              <div class="link-title">{{ link.title }}</div>
              @if (link.description) {
              <div class="link-description">
                {{ link.description }}
              </div>
              }
            </div>

            <!-- External Link Indicator -->
            <div class="link-external">
              <i class="ti-external-link"></i>
            </div>
          </a>
        </div>
        }
      </div>
      } @else {
      <!-- Empty State -->
      <div class="empty-state text-center py-5">
        <i class="ti-link display-1 text-muted mb-3 icon-colorful"></i>
        <h4 class="text-muted">No links available</h4>
        <p class="text-muted">Configure your links in the profile config file.</p>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .links-container {
        max-width: 500px;
        margin: 0 auto;
      }

      .links-list {
        width: 100%;
      }

      .link-item-wrapper {
        margin-bottom: 1rem;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .link-item {
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 1.25rem;
        text-decoration: none;
        color: var(--primary-text);
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.3s ease;
        position: relative;
        width: 100%;
        backdrop-filter: blur(10px);
        box-shadow: var(--shadow-sm);

        &:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
          text-decoration: none;

          .link-external i {
            opacity: 1;
            color: var(--accent);
          }
        }

        &:focus {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        &.link-disabled {
          opacity: 0.6;
          cursor: not-allowed;

          &:hover {
            background-color: var(--secondary-bg);
            color: var(--primary-text);
            transform: none;
            box-shadow: none;
          }
        }
      }

      .link-icon {
        flex-shrink: 0;
        width: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 1.5rem;
          min-width: 24px;
        }
      }

      .link-content {
        flex: 1;
        min-width: 0; // Allows text to truncate

        .link-title {
          font-weight: 600;
          margin-bottom: 0.25rem;
          font-size: 1rem;
          line-height: 1.3;
        }

        .link-description {
          font-size: 0.875rem;
          opacity: 0.8;
          margin: 0;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .link-stats {
        flex-shrink: 0;
        text-align: right;

        small {
          font-size: 0.75rem;
        }
      }

      .link-external {
        flex-shrink: 0;

        i {
          font-size: 1rem;
          opacity: 0.5;
          transition: var(--transition);
        }
      }

      .empty-state {
        padding: 3rem 1rem;
        background-color: var(--card-bg);
        border: 1px dashed var(--border-color);
        border-radius: 12px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;

        &:hover {
          border-color: var(--accent);
          border-style: solid;
          box-shadow: var(--shadow-md);
        }

        .display-1 {
          font-size: 4rem;
        }

        h4 {
          margin-bottom: 1rem;
        }
      }

      .alert {
        background-color: var(--secondary-bg);
        border: 1px solid var(--border-color);
        color: var(--primary-text);
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .links-container {
          margin: 0 0.5rem;
        }

        .link-item {
          padding: 0.75rem;

          .link-icon i {
            font-size: 1.25rem;
          }

          .link-title {
            font-size: 0.95rem;
          }

          .link-description {
            font-size: 0.8rem;
          }
        }

        .empty-state .display-1 {
          font-size: 3rem;
        }
      }

      @media (max-width: 480px) {
        .link-item {
          padding: 0.6rem;
          gap: 0.75rem;
        }
      }

      /* Animation for new links */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .link-item-wrapper {
        animation: fadeInUp 0.3s ease-out;
      }
    `,
  ],
})
export class LinksComponent {
  @Input() category?: LinkConfig['category'];
  @Input() maxLinks?: number;

  // Get links from config
  protected readonly allLinks = computed(() => {
    if (this.category) {
      return getLinksByCategory(this.category);
    }
    return getActiveLinks();
  });

  protected readonly displayLinks = computed(() => {
    const links = this.allLinks();
    return this.maxLinks ? links.slice(0, this.maxLinks) : links;
  });

  protected readonly hasLinks = computed(() => this.displayLinks().length > 0);

  protected onLinkClick(link: LinkConfig, event: MouseEvent): void {
    if (!link.isActive) {
      event.preventDefault();
      return;
    }

    // Track the click using client-side analytics
    trackLinkClick(link.id, link.url);
  }

  // trackBy function is no longer needed with @for (track link.id)
}
