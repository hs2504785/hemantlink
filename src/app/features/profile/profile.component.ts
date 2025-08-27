import { Component, Input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { getProfileInfo } from '../../core/config/profile.config';
import { CardComponent } from '../../shared/ui/card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="card border-0 shadow-sm text-center profile-card">
      <div class="card-body p-4">
        <!-- Profile Image -->
        <div class="mb-4">
          @if (profileData.profileImage) {
          <img
            ngSrc="{{ profileData.profileImage }}"
            alt="{{ profileData.name }} profile image"
            class="rounded-circle shadow-sm"
            width="120"
            height="120"
            priority
            style="object-fit: cover;"
            (error)="onImageError($event)"
          />
          } @else {
          <div
            class="rounded-circle bg-light shadow-sm d-flex align-items-center justify-content-center"
            style="width: 120px; height: 120px;"
          >
            <i class="ti-id-badge fs-1 text-muted icon-colorful"></i>
          </div>
          }
        </div>

        <!-- Profile Info -->
        <div>
          <h1 class="h2 fw-semibold mb-2">
            {{ profileData.name }}
          </h1>
          <p class="text-muted mb-0 fs-6">
            {{ profileData.tagline }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .profile-card {
        max-width: 500px;
        margin: 2rem auto;
        background-color: var(--card-bg) !important;
        backdrop-filter: blur(20px);
        border-radius: 20px !important;
      }

      /* Modern hover effect for profile card */
      .profile-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-xl);
        transition: all 0.3s ease;
      }

      /* Subtle image hover */
      img.rounded-circle:hover {
        transform: scale(1.02);
        transition: transform 0.3s ease;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .profile-card {
          margin: 1rem;
          border-radius: 16px !important;
        }

        img.rounded-circle,
        .rounded-circle {
          width: 100px !important;
          height: 100px !important;
        }
      }
    `,
  ],
})
export class ProfileComponent {
  // Get profile data from config
  protected readonly profile = getProfileInfo();

  // Optional override for custom profile data
  @Input() customProfile?: {
    name: string;
    tagline: string;
    profileImage: string;
  };

  // Computed profile data (either custom or from config)
  protected get profileData() {
    return this.customProfile || this.profile;
  }

  protected onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.error('❌ Profile image failed to load:', img.src);
    console.error('❌ Full image URL:', img.src);
    console.error('❌ Config path:', this.profileData.profileImage);

    // Hide the broken image
    img.style.display = 'none';

    // You could also set a fallback image here
    // img.src = '/assets/default-avatar.png';
  }

  // Method to get initials from name for fallback
  protected getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
