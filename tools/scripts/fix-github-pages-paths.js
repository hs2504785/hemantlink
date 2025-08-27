#!/usr/bin/env node

/**
 * Fix asset paths for GitHub Pages deployment
 * This script updates absolute paths to work with GitHub Pages base href
 */

const fs = require('fs');
const path = require('path');

function findCSSFiles(dir, basePath = '') {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(basePath, item);

    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...findCSSFiles(fullPath, relativePath));
    } else if (item.endsWith('.css')) {
      files.push(relativePath);
    }
  }

  return files;
}

function fixGitHubPagesPaths(outputDir, baseHref = '/hemantlink/') {
  console.log('🔧 Fixing asset paths for GitHub Pages deployment...');

  // Find all CSS files in the output directory
  const cssFiles = findCSSFiles(outputDir);

  if (cssFiles.length === 0) {
    console.log('⚠️  No CSS files found, skipping path fix');
    return;
  }

  cssFiles.forEach((cssFile) => {
    const filePath = path.join(outputDir, cssFile);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix font paths: /assets/fonts/ -> ./assets/fonts/ for GitHub Pages
    if (content.includes('/assets/fonts/')) {
      content = content.replace(/url\(\/assets\/fonts\//g, 'url(./assets/fonts/');
      modified = true;
    }

    // Fix other absolute asset paths if needed
    if (content.includes('/assets/')) {
      content = content.replace(/url\(\/assets\//g, 'url(./assets/');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed paths in: ${cssFile}`);
    }
  });

  console.log('✅ GitHub Pages asset paths fixed');
}

module.exports = { fixGitHubPagesPaths };

// If run directly
if (require.main === module) {
  const outputDir = process.argv[2] || 'dist/github-pages/browser';
  const baseHref = process.argv[3] || '/hemantlink/';
  fixGitHubPagesPaths(outputDir, baseHref);
}
