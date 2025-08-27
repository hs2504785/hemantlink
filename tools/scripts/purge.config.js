/**
 * Shared configuration for PurgeCSS and UnCSS
 * @param {string} sourceDir - The source directory for built files
 * @returns {object} Configuration object for PurgeCSS
 */
function createPurgeConfig(sourceDir = 'dist/hemantlink/browser') {
  return {
    // Source directory for built files
    sourceDir,

    // Files to analyze for used CSS
    content: [
      `${sourceDir}/index.html`,
      `${sourceDir}/*.js`,
      // Also analyze TypeScript source files for better class detection
      'src/**/*.ts',
      'src/**/*.html',
      // Include Angular component templates and styles
      'src/**/*.component.ts',
      'src/**/*.component.html',
    ],

    // CSS files to process
    css: [`${sourceDir}/*.css`],

    // Safelist configuration - ONLY dynamic CSS that PurgeCSS can't detect
    safelist: {
      // Only truly dynamic selectors
      standard: [
        // Theme attribute selectors (applied via JavaScript)
        '[data-theme="dark"]',
        '[data-theme="purple"]',
        ':root:not([data-theme])',

        // Angular-generated component selectors (generated at build time)
        /^_ngcontent-ng-c\d+$/,
        /^_nghost-ng-c\d+$/,
      ],

      // Deep selectors for theme-dependent nested styles
      deep: [/\[data-theme="dark"\]/, /\[data-theme="purple"\]/, /:root:not\(\[data-theme\]\)/],

      // Minimal greedy patterns for dynamic content
      greedy: [
        /data-theme/,
        /prefers-color-scheme/,
        /_ng/, // Angular component selectors
      ],

      // CSS variables (might not be detected properly by PurgeCSS)
      variables: [
        '--primary-bg',
        '--secondary-bg',
        '--card-bg',
        '--primary-text',
        '--secondary-text',
        '--accent',
        '--accent-hover',
        '--border-color',
        '--shadow',
        '--shadow-sm',
        '--shadow-lg',
        '--shadow-xl',
        '--transition',
        '--border-radius',
      ],

      // Keyframes (might not be detected if referenced in CSS variables)
      keyframes: ['fadeInUp', 'fadeIn', 'bounce', 'gradient-shift'],
    },

    // PurgeCSS options
    options: {
      variables: true,
      keyframes: true,
      fontFace: true,
      rejected: true, // This helps with debugging by showing which selectors were removed
    },
  };
}

// Export the function and backward compatibility
module.exports = createPurgeConfig;
module.exports.createPurgeConfig = createPurgeConfig;
