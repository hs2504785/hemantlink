# SCSS Architecture Documentation

This document outlines the organized SCSS architecture for the HemantLink project, following modern best practices and maintainability standards.

## 📁 File Structure

```
src/styles/
├── abstracts/          # Variables, mixins, functions
│   ├── _variables.scss  # CSS custom properties & SCSS variables
│   └── _mixins.scss     # Reusable mixins and functions
├── base/               # Global styles, resets, typography
│   ├── _global.scss     # Global styles and resets
│   └── _animations.scss # Keyframes and animation utilities
├── themes/             # Theme definitions and overrides
│   └── _themes.scss     # Light, dark, and purple themes
└── components/         # Component-specific styles
    ├── _buttons.scss    # Button variations and utilities
    ├── _cards.scss      # Card components and link items
    └── _layout.scss     # Layout components and utilities
```

## 🎯 Architecture Principles

### 1. **Separation of Concerns**

- **Abstracts**: Pure variables and mixins (no CSS output)
- **Base**: Global styles that affect the entire application
- **Themes**: Theme-specific overrides using CSS custom properties
- **Components**: Modular, reusable component styles

### 2. **Modern SCSS**

- Uses `@use` instead of deprecated `@import`
- CSS custom properties for theming
- Mobile-first responsive design
- BEM-like naming conventions

### 3. **Performance Focused**

- Minimal CSS output from abstracts
- Tree-shakable component styles
- Optimized for CSS compression

## 📋 File Descriptions

### `abstracts/_variables.scss`

**Purpose**: Define design tokens and SCSS variables

**Contents**:

- CSS custom properties (`:root` variables)
- SCSS variables for calculations
- Breakpoint definitions
- Component-specific measurements

**Usage**:

```scss
// CSS custom properties (runtime themeable)
--primary-bg: #ffffff;
--accent: #0d6efd;

// SCSS variables (compile-time constants)
$breakpoint-md: 768px;
$profile-image-size: 120px;
```

### `abstracts/_mixins.scss`

**Purpose**: Reusable SCSS mixins and utility functions

**Key Mixins**:

- `@mixin media-breakpoint-up($breakpoint)` - Responsive breakpoints
- `@mixin button-base` - Base button styling
- `@mixin card-base` - Base card styling
- `@mixin fade-in-up($delay)` - Animation utilities
- `@mixin focus-ring($color)` - Accessibility focus states

**Usage**:

```scss
.my-component {
  @include button-base;
  @include media-breakpoint-up(md) {
    padding: 2rem;
  }
}
```

### `base/_global.scss`

**Purpose**: Global styles affecting the entire application

**Contents**:

- CSS reset/normalize
- Typography defaults
- Global element styling (body, html, a, img, etc.)
- Accessibility improvements
- Scrollbar styling

### `base/_animations.scss`

**Purpose**: Keyframe animations and animation utilities

**Contents**:

- `@keyframes` definitions (fadeInUp, scaleIn, etc.)
- Animation utility classes
- Staggered animation helpers
- Reduced motion support

### `themes/_themes.scss`

**Purpose**: Theme definitions and theme-specific overrides

**Features**:

- Light theme (default)
- Dark theme (`[data-theme="dark"]`)
- Purple theme (`[data-theme="purple"]`)
- High contrast theme (accessibility)
- System preference detection
- Theme-specific component overrides

### `components/_buttons.scss`

**Purpose**: All button-related styles

**Components**:

- `.btn-theme` base class with variants
- Theme toggle button
- Button groups
- Floating action buttons
- Loading states

### `components/_cards.scss`

**Purpose**: Card components and related elements

**Components**:

- `.card-theme` base class
- Profile cards
- Link items
- Empty states
- Loading spinners
- Alert components

### `components/_layout.scss`

**Purpose**: Layout components and utility classes

**Components**:

- App container and main content
- Grid system enhancements
- Section layouts
- Footer styling
- Loading overlays
- Utility classes (spacing, display, flex, etc.)

## 🎨 Theming System

### CSS Custom Properties

All colors and theme-specific values use CSS custom properties:

```scss
:root {
  --primary-bg: #ffffff;
  --accent: #0d6efd;
  // ... more variables
}

[data-theme='dark'] {
  --primary-bg: #121212;
  --accent: #bb86fc;
  // ... overrides
}
```

### Theme Usage

Apply themes by setting the `data-theme` attribute:

```html
<html data-theme="dark">
  <html data-theme="purple">
    <!-- No attribute = light theme -->
  </html>
</html>
```

## 📱 Responsive Design

### Breakpoint System

Following Bootstrap 5 conventions:

```scss
$breakpoint-sm: 576px; // Small devices
$breakpoint-md: 768px; // Medium devices
$breakpoint-lg: 992px; // Large devices
$breakpoint-xl: 1200px; // Extra large devices
$breakpoint-xxl: 1400px; // Extra extra large devices
```

### Mobile-First Approach

All styles are mobile-first, using `min-width` media queries:

```scss
.component {
  // Mobile styles (default)

  @include media-breakpoint-up(md) {
    // Tablet and up
  }

  @include media-breakpoint-up(lg) {
    // Desktop and up
  }
}
```

## 🔧 Usage Guidelines

### 1. **Adding New Styles**

**For new components**:

1. Create a new file in `components/`
2. Add the import to `styles.scss`
3. Use existing variables and mixins

**For theme modifications**:

1. Add CSS custom properties to `_variables.scss`
2. Add theme overrides to `_themes.scss`

**For new utilities**:

1. Add mixins to `_mixins.scss`
2. Add utility classes to `_layout.scss`

### 2. **Best Practices**

- Always use CSS custom properties for theme-able values
- Use SCSS variables for calculations and constants
- Follow BEM-like naming conventions
- Include focus states for accessibility
- Test with all three themes
- Ensure mobile responsiveness

### 3. **Performance Considerations**

- Avoid deep nesting (max 3 levels)
- Use mixins to avoid code duplication
- Leverage CSS custom properties for runtime theming
- Keep selectors specific but not overly complex

## 🚀 Build Integration

The main `styles.scss` file imports all partials:

```scss
// Bootstrap integration
@use 'bootstrap/scss/bootstrap';

// Custom architecture
@use 'styles/abstracts/variables';
@use 'styles/abstracts/mixins';
@use 'styles/base/global';
@use 'styles/base/animations';
@use 'styles/themes/themes';
@use 'styles/components/buttons';
@use 'styles/components/cards';
@use 'styles/components/layout';
```

This architecture ensures:

- ✅ Maintainable and organized code
- ✅ Easy theme customization
- ✅ Reusable components
- ✅ Performance optimization
- ✅ Modern SCSS practices
- ✅ Accessibility compliance
