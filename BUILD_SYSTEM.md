# Reusable Build System

This project includes a flexible build system that works for both regular production builds and GitHub Pages deployment with automatic CSS optimization.

## 🚀 Quick Start

### Regular Production Build

```bash
npm run build           # Full build with CSS optimization
npm run build:quick     # Quick build without CSS optimization
```

### GitHub Pages Build

```bash
npm run build:gh-pages       # Full GitHub Pages build with CSS optimization
npm run build:gh-pages-quick # Quick GitHub Pages build without CSS optimization
```

### Manual Deployment

```bash
npm run deploy:gh-pages       # Build and deploy to GitHub Pages
npm run deploy:gh-pages-force # Build and deploy with verbose output
```

## 🛠️ Build Script Usage

The core build script supports flexible configurations:

```bash
# Basic usage
node tools/scripts/build.js [build-type] [options]

# Build types
node tools/scripts/build.js production      # Regular production build
node tools/scripts/build.js github-pages   # GitHub Pages build

# Options
--skip-uncss    # Skip CSS optimization for faster builds
--skip-cleanup  # Skip cleanup of temporary files
```

## 📋 Build Configurations

### Production Build

- **Output**: `dist/hemantlink/browser`
- **Base href**: Default (from angular.json)
- **CSS optimization**: ✅ Included
- **Use case**: Local deployment, traditional hosting

### GitHub Pages Build

- **Output**: `dist/github-pages/browser`
- **Base href**: `/hemantlink/`
- **CSS optimization**: ✅ Included
- **Cleanup**: Removes `index.csr.html`
- **Use case**: GitHub Pages deployment

## 🎨 CSS Optimization (UnCSS)

The build system automatically optimizes CSS by removing unused styles:

### Automatic Integration

- Runs after Angular build completion
- Reduces CSS file size by ~90% (245KB → 27KB)
- Analyzes all TypeScript and HTML files for used classes

### Manual CSS Optimization

```bash
# Default (production build output)
npm run uncss

# Specific directory
npm run uncss:production     # dist/hemantlink/browser
npm run uncss:gh-pages      # dist/github-pages/browser

# Custom directory
node tools/scripts/uncss.js path/to/build/output
```

### Configuration

The CSS optimization respects:

- Angular component selectors
- Theme-dependent classes
- CSS variables
- Bootstrap classes
- Custom safelist patterns

Edit `tools/scripts/purge.config.js` to modify safelist rules.

## 🔄 GitHub Actions Integration

The build system works seamlessly with GitHub Actions:

```yaml
- name: Build for GitHub Pages
  run: npm run build:gh-pages
```

The existing workflow in `.github/workflows/deploy-gh-pages.yml` automatically uses the reusable build system.

## 📁 Output Structure

### Production Build

```
dist/hemantlink/
├── browser/           # Static files for deployment
│   ├── index.html
│   ├── *.js
│   └── *.css
└── server/            # SSR files
    └── server.mjs
```

### GitHub Pages Build

```
dist/github-pages/
├── browser/           # Static files for GitHub Pages
│   ├── index.html     # Pre-rendered with base href
│   ├── *.js
│   └── *.css          # Optimized
└── server/            # SSR files (not deployed)
```

## ⚡ Performance Benefits

- **CSS Optimization**: ~90% reduction in CSS file size
- **Flexible Base Href**: Proper routing for different deployment targets
- **Parallel Processing**: Efficient build pipeline
- **Skip Options**: Fast builds during development

## 🔧 Customization

### Adding New Build Configurations

Edit `tools/scripts/build.js` and add to `BUILD_CONFIGS`:

```javascript
const BUILD_CONFIGS = {
  // Existing configs...
  'custom-deployment': {
    configuration: 'production',
    outputDir: 'dist/custom',
    baseHref: '/custom-path/',
    displayName: 'Custom Deployment',
  },
};
```

### Modifying CSS Optimization

Edit `tools/scripts/purge.config.js` to adjust:

- Safelist patterns
- Content analysis paths
- PurgeCSS options

## 🚨 Common Issues

### CSS Classes Being Removed

Add patterns to the safelist in `purge.config.js`:

```javascript
safelist: {
  standard: ['your-dynamic-class'],
  greedy: [/pattern-for-dynamic-classes/]
}
```

### Build Warnings

- **Budget exceeded**: Normal for initial builds, CSS optimization reduces final size
- **Missing stylesheet**: Check file paths in `angular.json` assets configuration

## 📝 Development Workflow

1. **Development**: Use `npm start` for live reload
2. **Testing builds**: Use quick variants (`build:quick`, `build:gh-pages-quick`)
3. **Production**: Use full builds with CSS optimization
4. **Deployment**: GitHub Actions handles automatic deployment

## 🎯 Benefits Summary

✅ **Single build system** for multiple deployment targets  
✅ **Automatic CSS optimization** reduces bundle size  
✅ **Flexible base href** handling  
✅ **Skip options** for faster development builds  
✅ **GitHub Actions** integration  
✅ **Comprehensive error handling** and user feedback  
✅ **Backward compatibility** with existing npm scripts
