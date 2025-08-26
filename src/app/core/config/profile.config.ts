// ================================================
// PROFILE CONFIGURATION
// ================================================

export interface ProfileConfig {
  name: string;
  tagline: string;
  profileImage: string;
  links: LinkConfig[];
  social: SocialConfig;
  analytics?: AnalyticsConfig;
}

export interface LinkConfig {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
  category?: 'social' | 'work' | 'personal' | 'other';
}

export interface SocialConfig {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  email?: string;
  website?: string;
}

export interface AnalyticsConfig {
  googleAnalytics?: string;
  umami?: string;
  plausible?: string;
}

// ================================================
// PROFILE DATA CONFIGURATION
// ================================================

export const PROFILE_CONFIG: ProfileConfig = {
  name: 'Hemant Kumar Singh',
  tagline: 'UI Architect | Full Stack Developer | Angular Expert | Open Source Contributor',
  profileImage: 'assets/images/me.jpeg', // Use assets/ for app images

  social: {
    github: 'https://github.com/hemantajax',
    linkedin: 'https://www.linkedin.com/in/hkajax/',
    twitter: 'https://x.com/hemantajax',
    email: 'mailto:hemant.ajax@gmail.com',
    website: 'https://hs950559.github.io/portfolio',
  },

  analytics: {
    // Add your analytics IDs here
    // googleAnalytics: 'GA_MEASUREMENT_ID',
    // umami: 'UMAMI_WEBSITE_ID',
  },

  links: [
    {
      id: 'github-profile',
      title: 'GitHub Profile',
      description: 'Check out my open source projects and contributions',
      url: 'https://github.com/hemantajax',
      icon: 'ti-github',
      isActive: true,
      sortOrder: 1,
      category: 'work',
    },
    {
      id: 'linkedin-profile',
      title: 'LinkedIn',
      description: 'Connect with me professionally',
      url: 'https://linkedin.com/in/hkajax',
      icon: 'ti-linkedin',
      isActive: true,
      sortOrder: 2,
      category: 'work',
    },
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      description: 'View my work, projects, and case studies',
      url: 'https://hs950559.github.io/portfolio',
      icon: 'ti-world',
      isActive: true,
      sortOrder: 3,
      category: 'work',
    },
    {
      id: 'resume-pdf',
      title: 'Download Resume (PDF)',
      description: 'Get my latest resume as PDF',
      url: 'assets/documents/hemant-profile.pdf',
      icon: 'ti-download',
      isActive: true,
      sortOrder: 4,
      category: 'work',
    },
    {
      id: 'resume-docx',
      title: 'Download Resume (Word)',
      description: 'Get my latest resume as DOCX',
      url: 'assets/documents/hemant-profile.docx',
      icon: 'ti-file',
      isActive: true,
      sortOrder: 5,
      category: 'work',
    },
    // {
    //   id: 'blog',
    //   title: 'Tech Blog',
    //   description: 'Read my thoughts on web development',
    //   url: 'https://hs950559.github.io/blog',
    //   icon: 'ti-pencil-alt',
    //   isActive: true,
    //   sortOrder: 6,
    //   category: 'personal',
    // },
    // {
    //   id: 'youtube-channel',
    //   title: 'YouTube Channel',
    //   description: 'Web development tutorials and coding tips',
    //   url: 'https://youtube.com/@hemantajax',
    //   icon: 'ti-youtube',
    //   isActive: true,
    //   sortOrder: 6,
    //   category: 'social',
    // },
    {
      id: 'contact-form',
      title: 'Contact Me',
      description: 'Get in touch for opportunities',
      url: 'mailto:hemant.ajax@gmail.com',
      icon: 'ti-envelope',
      isActive: true,
      sortOrder: 8,
      category: 'personal',
    },
    {
      id: 'calendar-booking',
      title: 'Book a Meeting',
      description: 'Schedule a 30-minute chat',
      url: 'https://calendly.com/hemant-ajax',
      icon: 'ti-calendar',
      isActive: true,
      sortOrder: 8,
      category: 'work',
    },
  ],
};

// ================================================
// UTILITY FUNCTIONS
// ================================================

/**
 * Get active links sorted by sort order
 */
export function getActiveLinks(): LinkConfig[] {
  return PROFILE_CONFIG.links
    .filter((link) => link.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Get links by category
 */
export function getLinksByCategory(category: LinkConfig['category']): LinkConfig[] {
  return getActiveLinks().filter((link) => link.category === category);
}

/**
 * Get social media links
 */
export function getSocialLinks(): Partial<SocialConfig> {
  return PROFILE_CONFIG.social;
}

/**
 * Get profile info
 */
export function getProfileInfo() {
  return {
    name: PROFILE_CONFIG.name,
    tagline: PROFILE_CONFIG.tagline,
    profileImage: PROFILE_CONFIG.profileImage,
  };
}

/**
 * Track link click (client-side analytics)
 */
export function trackLinkClick(linkId: string, url: string): void {
  // Google Analytics 4
  if (typeof (window as any).gtag !== 'undefined') {
    (window as any).gtag('event', 'click', {
      event_category: 'Link',
      event_label: linkId,
      value: url,
    });
  }

  // Umami Analytics
  if (typeof (window as any).umami !== 'undefined') {
    (window as any).umami.track('Link Click', { linkId, url });
  }

  // Plausible Analytics
  if (typeof (window as any).plausible !== 'undefined') {
    (window as any).plausible('Link Click', { props: { linkId, url } });
  }

  // Console log for development
  console.log(`Link clicked: ${linkId} -> ${url}`);
}
