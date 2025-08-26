const sourceDir = 'dist/hemantlink/browser';

/**
 * Shared configuration for PurgeCSS and UnCSS
 */
module.exports = {
  // Source directory for built files
  sourceDir,

  // Files to analyze for used CSS
  content: [`${sourceDir}/index.html`, `${sourceDir}/*.js`],

  // CSS files to process
  css: [`${sourceDir}/*.css`],

  // Safelist configuration
  safelist: {
    standard: [],
    deep: [],
    greedy: [],
    variables: [],
    keyframes: [],
  },

  // PurgeCSS options
  options: {
    variables: true,
    keyframes: true,
    fontFace: true,
    rejected: true, // This helps with debugging by showing which selectors were removed
  },
};
