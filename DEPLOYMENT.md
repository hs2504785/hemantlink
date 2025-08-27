# GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages.

## Manual Deployment

Use these npm scripts for manual deployment:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Build and deploy to GitHub Pages
npm run deploy:gh-pages

# Build and deploy with verbose output (for debugging)
npm run deploy:gh-pages-force
```

## Automatic Deployment

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` or `master` branch.

### Setup GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. Push your code to the main branch

The site will be available at: `https://yourusername.github.io/hemantlink/`

## Configuration Details

- **Build Configuration**: Uses the `github-pages` configuration in `angular.json`
- **Base Href**: Set to `/hemantlink/` to match the repository name
- **Output Mode**: Static (no SSR) for GitHub Pages compatibility
- **Output Path**: `dist/github-pages/browser`

## Notes

- The site is built without Server-Side Rendering (SSR) since GitHub Pages only serves static files
- Service Worker is enabled for offline functionality
- The deployment includes optimized builds with tree-shaking and minification
