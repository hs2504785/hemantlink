/**
 * Shared configuration for PurgeCSS and UnCSS
 * 
 * @param {string} sourceDir - The directory containing built files
 */
module.exports = (sourceDir = 'dist/hemantlink/browser') => ({
  // Source directory for built files
  sourceDir,

  // Files to analyze for used CSS
  content: [`${sourceDir}/index.html`, `${sourceDir}/*.js`],

  // CSS files to process
  css: [`${sourceDir}/*.css`],

  // Safelist configuration - preserves theme and dynamic CSS
  safelist: {
    standard: [
      // Theme toggle classes
      'theme-toggle',
      'icon-colorful',
      
      // Theme-specific icons and dynamic classes
      'ti-sun', 'ti-moon', 'ti-palette',
      'ti-github', 'ti-linkedin', 'ti-world', 'ti-download', 'ti-file',
      'ti-envelope', 'ti-calendar', 'ti-pencil', 'ti-pencil-alt', 'ti-youtube',
      'ti-twitter', 'ti-instagram', 'ti-phone', 'ti-location-pin', 'ti-link',
      'ti-id-badge', 'ti-external-link',
      
      // Bootstrap utility classes that might be applied dynamically
      'text-muted', 'fw-semibold', 'fs-6', 'mb-0', 'mb-2', 'mb-3', 'mb-4',
      'p-4', 'text-center', 'rounded-circle', 'shadow-sm', 'border-0',
      
      // Card and layout classes
      'card', 'card-body', 'card-title', 'card-subtitle', 'card-text',
      'link-item', 'link-icon', 'link-content', 'link-title', 'link-description',
      'link-external', 'empty-state', 'profile-card'
    ],
    deep: [
      // Deep selector patterns for theme-specific styling
      /data-theme/,
      /\[data-theme/,
      /theme-toggle/,
      /icon-colorful/
    ],
    greedy: [
      // Greedy patterns for dynamic theme classes
      /^data-theme/,
      /\[data-theme=['"]dark['"]\]/,
      /\[data-theme=['"]purple['"]\]/,
      /\[data-theme=['"]light['"]\]/,
      /theme/,
      /toggle/
    ],
    variables: [
      // CSS custom properties
      '--primary-bg', '--secondary-bg', '--card-bg', '--primary-text', '--secondary-text',
      '--accent', '--accent-hover', '--border-color', '--shadow', '--shadow-sm',
      '--shadow-md', '--shadow-lg', '--shadow-xl'
    ],
    keyframes: [
      'fadeInUp', 'gradient-shift'
    ],
  },

  // PurgeCSS options
  options: {
    variables: true,
    keyframes: true,
    fontFace: true,
    rejected: true, // This helps with debugging by showing which selectors were removed
  },
});
