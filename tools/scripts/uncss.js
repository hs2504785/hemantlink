const fs = require('fs').promises;
const { statSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { PurgeCSS } = require('purgecss');

async function main() {
  // Allow directory to be passed as command line argument
  const targetDir = process.argv[2] || 'dist/hemantlink/browser';
  
  const config = {
    sourceDir: targetDir,
    content: [`${targetDir}/index.html`, `${targetDir}/*.js`],
    css: [`${targetDir}/*.css`],
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
    options: {
      variables: true,
      keyframes: true,
      fontFace: true,
      rejected: true,
    }
  };
  try {
    // find the styles css file
    const files = await getFilesFromPath(config.sourceDir, '.css');
    const data = [];

    if (!files || files.length <= 0) {
      console.log('Cannot find style files to purge');
      return;
    }

    for (const f of files) {
      // get original file size
      const originalSize = getFilesizeInKiloBytes(join(config.sourceDir, f)) + 'kb';
      const o = { file: f, originalSize: originalSize, newSize: '' };
      data.push(o);
    }

    console.log('Running PurgeCSS...');

    try {
      // Process each CSS file
      for (const d of data) {
        const cssFile = join(config.sourceDir, d.file);
        const cssContent = readFileSync(cssFile, 'utf8');

        const purgeCSS = new PurgeCSS();
        const result = await purgeCSS.purge({
          content: config.content,
          css: [{ raw: cssContent }],
          safelist: config.safelist,
          ...config.options
        });

        if (result && result.length > 0) {
          // Write purged CSS back to the file
          writeFileSync(cssFile, result[0].css);
          // get new file size
          const newSize = getFilesizeInKiloBytes(cssFile) + 'kb';
          d.newSize = newSize;
        } else {
          console.warn(`Warning: No purged content for ${d.file}`);
          d.newSize = 'N/A';
        }
      }

      console.log('PurgeCSS completed');
      console.log();
      console.table(data);

    } catch (err) {
      console.error('Error during purge:', err);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

function getFilesizeInKiloBytes(filename) {
  const stats = statSync(filename);
  const fileSizeInBytes = stats.size / 1024;
  return fileSizeInBytes.toFixed(2);
}

async function getFilesFromPath(dir, extension) {
  const files = await fs.readdir(dir);
  return files.filter(e => e.toLowerCase().endsWith(extension));
}

main();
