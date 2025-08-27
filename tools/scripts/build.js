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
