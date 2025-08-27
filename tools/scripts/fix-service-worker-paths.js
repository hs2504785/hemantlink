#!/usr/bin/env node

/**
 * Fix service worker paths for GitHub Pages deployment
 * This script updates the ngsw.json file to use the correct base href paths
 */

const { readFileSync, writeFileSync, existsSync } = require('fs');
const { join } = require('path');

function fixServiceWorkerPaths(outputDir, baseHref) {
  console.log('\n🔧 Fixing service worker paths for GitHub Pages...');

  const ngsWConfigPath = join(outputDir, 'ngsw.json');

  if (!existsSync(ngsWConfigPath)) {
    console.warn('⚠️  ngsw.json not found, skipping service worker path fix');
    return;
  }

  try {
    // Read the service worker configuration
    const ngsWConfig = JSON.parse(readFileSync(ngsWConfigPath, 'utf8'));

    // Function to update paths with base href
    function updatePaths(obj, baseHref) {
      if (typeof obj === 'string' && obj.startsWith('/') && !obj.startsWith(baseHref)) {
        return baseHref.slice(0, -1) + obj; // Remove trailing slash from baseHref and add path
      }

      if (Array.isArray(obj)) {
        return obj.map((item) => updatePaths(item, baseHref));
      }

      if (obj && typeof obj === 'object') {
        const updated = {};
        for (const [key, value] of Object.entries(obj)) {
          updated[key] = updatePaths(value, baseHref);
        }
        return updated;
      }

      return obj;
    }

    // Update all paths in the service worker configuration
    const updatedConfig = updatePaths(ngsWConfig, baseHref);

    // Write the updated configuration back
    writeFileSync(ngsWConfigPath, JSON.stringify(updatedConfig, null, 2));

    console.log('✅ Service worker paths updated successfully');
    console.log(`🔗 Base href: ${baseHref}`);
  } catch (error) {
    console.error('❌ Failed to fix service worker paths:', error.message);
    throw error;
  }
}

module.exports = { fixServiceWorkerPaths };

// If run directly (not imported)
if (require.main === module) {
  const outputDir = process.argv[2];
  const baseHref = process.argv[3] || '/';

  if (!outputDir) {
    console.error('Usage: node fix-service-worker-paths.js <output-dir> [base-href]');
    process.exit(1);
  }

  fixServiceWorkerPaths(outputDir, baseHref);
}
