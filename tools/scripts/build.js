#!/usr/bin/env node

/**
 * Reusable build script for both regular and GitHub Pages builds
 * Usage:
 *   node tools/scripts/build.js [production|github-pages] [options]
 *
 * Options:
 *   --skip-uncss    Skip the uncss optimization step
 *   --skip-cleanup  Skip cleanup of temporary files
 */

const { execSync } = require('child_process');
const { existsSync, unlinkSync } = require('fs');
const { join } = require('path');
const { fixGitHubPagesPaths } = require('./fix-github-pages-paths');

// Configuration for different build types
const BUILD_CONFIGS = {
  production: {
    configuration: 'production',
    outputDir: 'dist/hemantlink/browser',
    baseHref: null, // Uses default from angular.json
    displayName: 'Production Build',
  },
  'github-pages': {
    configuration: 'github-pages',
    outputDir: 'dist/github-pages/browser',
    baseHref: '/hemantlink/',
    displayName: 'GitHub Pages Build',
  },
};

async function main() {
  try {
    // Parse command line arguments
    const buildType = process.argv[2] || 'production';
    const skipUncss = process.argv.includes('--skip-uncss');
    const skipCleanup = process.argv.includes('--skip-cleanup');

    // Validate build type
    if (!BUILD_CONFIGS[buildType]) {
      console.error(`❌ Invalid build type: ${buildType}`);
      console.error(`Available types: ${Object.keys(BUILD_CONFIGS).join(', ')}`);
      process.exit(1);
    }

    const config = BUILD_CONFIGS[buildType];

    console.log(`🚀 Starting ${config.displayName}...`);
    console.log(`📁 Output directory: ${config.outputDir}`);
    if (config.baseHref) {
      console.log(`🔗 Base href: ${config.baseHref}`);
    }
    console.log();

    // Step 1: Angular Build
    console.log('📦 Building Angular application...');
    const buildCommand = `ng build --configuration ${config.configuration}`;

    try {
      execSync(buildCommand, { stdio: 'inherit' });
      console.log('✅ Angular build completed successfully');
    } catch (error) {
      console.error('❌ Angular build failed');
      process.exit(1);
    }

    // Step 2: CSS Optimization with UnCSS
    if (!skipUncss) {
      console.log('\n🎨 Optimizing CSS with UnCSS...');
      try {
        execSync(`node tools/scripts/uncss.js "${config.outputDir}"`, { stdio: 'inherit' });
        console.log('✅ CSS optimization completed');
      } catch (error) {
        console.warn('⚠️  CSS optimization failed, continuing without it');
        console.warn(error.message);
      }
    } else {
      console.log('\n⏭️  Skipping CSS optimization');
    }

    // Step 2.5: Fix GitHub Pages paths (if applicable)
    if (buildType === 'github-pages') {
      fixGitHubPagesPaths(config.outputDir, config.baseHref);
    }

    // Step 2.6: Generate Service Worker (AFTER all file modifications)
    if (config.configuration === 'production' || config.configuration === 'github-pages') {
      console.log('\n🔧 Generating service worker after post-processing...');
      try {
        const swCommand = `npx ngsw-config ${config.outputDir} ngsw-config.json`;
        console.log(`🔧 Running: ${swCommand}`);
        execSync(swCommand, { stdio: 'inherit' });

        // Copy service worker files from Angular
        console.log('📋 Copying service worker files...');
        const { copyFileSync } = require('fs');
        const path = require('path');

        const workerSourceDir = path.join('node_modules', '@angular', 'service-worker');
        const workerFiles = ['ngsw-worker.js', 'safety-worker.js'];

        workerFiles.forEach((file) => {
          const sourcePath = path.join(workerSourceDir, file);
          const destPath = path.join(config.outputDir, file);
          try {
            copyFileSync(sourcePath, destPath);
            console.log(`✅ Copied: ${file}`);
          } catch (error) {
            console.warn(`⚠️  Could not copy ${file}:`, error.message);
          }
        });

        // Apply base href fixes if needed for GitHub Pages
        if (buildType === 'github-pages') {
          console.log(`🔧 Fixing service worker paths for base href: ${config.baseHref}`);

          const ngsWPath = join(config.outputDir, 'ngsw.json');
          const { readFileSync, writeFileSync } = require('fs');
          const ngsWConfig = JSON.parse(readFileSync(ngsWPath, 'utf8'));

          // Function to update paths with base href
          function updatePaths(obj, baseHref) {
            if (typeof obj === 'string' && obj.startsWith('/') && !obj.startsWith(baseHref)) {
              return baseHref.slice(0, -1) + obj;
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

          const updatedConfig = updatePaths(ngsWConfig, config.baseHref);
          writeFileSync(ngsWPath, JSON.stringify(updatedConfig, null, 2));
          console.log('✅ Service worker paths updated for GitHub Pages');
        }

        console.log('✅ Service worker generated successfully');
      } catch (error) {
        console.warn('⚠️  Service worker generation failed, continuing without it');
        console.warn(error.message);
      }
    }

    // Step 3: Cleanup (if applicable)
    if (!skipCleanup && buildType === 'github-pages') {
      console.log('\n🧹 Cleaning up temporary files...');
      const filesToCleanup = [join(config.outputDir, 'index.csr.html')];

      filesToCleanup.forEach((file) => {
        if (existsSync(file)) {
          unlinkSync(file);
          console.log(`🗑️  Removed: ${file}`);
        }
      });
      console.log('✅ Cleanup completed');
    } else if (skipCleanup) {
      console.log('\n⏭️  Skipping cleanup');
    }

    // Step 4: Success summary
    console.log(`\n🎉 ${config.displayName} completed successfully!`);
    console.log(`📂 Build output: ${config.outputDir}`);

    // Additional info for GitHub Pages
    if (buildType === 'github-pages') {
      console.log('\n📋 Next steps for GitHub Pages:');
      console.log('   • Commit and push your changes');
      console.log('   • GitHub Actions will automatically deploy');
      console.log('   • Or run: npx angular-cli-ghpages --dir=' + config.outputDir);
    }
  } catch (error) {
    console.error('\n❌ Build process failed:');
    console.error(error.message);
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n⚠️  Build process interrupted by user');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Build process terminated');
  process.exit(1);
});

main();
