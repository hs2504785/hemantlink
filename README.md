# HemantLink - Modern Link-in-bio App

A lightweight, fast, and beautiful link-in-bio application built with **Angular 20**, **Bootstrap 5**, and **Themify Icons**. Features a clean architecture with JSON-based configuration and a sophisticated theming system.

## 🚀 Why This Approach?

### ✅ **JSON Config vs Database**
Instead of using a heavy database solution like Supabase, this app uses a simple **TypeScript configuration file**:
- **Faster**: No API calls, instant loading
- **Simpler**: Just edit one config file
- **Cheaper**: No server or database costs
- **Reliable**: No external dependencies
- **Version controlled**: Track changes in Git

### ✅ **Key Benefits**
- **130kB smaller bundle** (removed Supabase dependencies)
- **Zero external dependencies** for core functionality
- **Perfect for static hosting** (Vercel, Netlify, GitHub Pages)
- **SEO optimized** with Angular SSR
- **Type-safe configuration** with full TypeScript support

## 🛠️ Tech Stack

- **Frontend**: Angular 20 + TypeScript
- **Styling**: Bootstrap 5 + SCSS Architecture
- **Icons**: Themify Icons (local assets)
- **Analytics**: Google Analytics, Umami, or Plausible (optional)
- **Build**: Angular CLI with SSR support

## 🎨 Features

### 🔥 **Core Features**
- **Profile Section**: Name, tagline, and profile image
- **Dynamic Links**: Organized by categories (work, social, personal)
- **3 Beautiful Themes**: Light, Dark, and Purple with smooth transitions
- **Mobile-First Design**: Optimized for mobile link-in-bio usage
- **Click Analytics**: Built-in tracking with popular analytics services

### 🎭 **Theming System**
- **CSS Custom Properties**: Runtime theme switching
- **System Preference Detection**: Automatic dark mode
- **Theme Persistence**: Remembers user's choice
- **Smooth Transitions**: Elegant theme switching animations

### 📱 **Responsive Design**
- **Mobile-First**: Perfect for phones (primary use case)
- **Bootstrap 5 Grid**: Responsive breakpoints
- **Touch-Friendly**: Large buttons and spacing
- **Fast Loading**: Optimized for mobile networks

## 📁 Project Architecture

```
src/
├── app/
│   ├── core/
│   │   ├── config/
│   │   │   ├── profile.config.ts    # 📝 Main configuration
│   │   │   └── README.md           # Configuration guide
│   │   └── services/
│   │       └── theme.service.ts    # Theme management
│   ├── features/
│   │   ├── profile/                # Profile component
│   │   └── links/                  # Links component
│   ├── shared/
│   │   └── ui/                     # Reusable UI components
│   └── styles/                     # Organized SCSS architecture
│       ├── abstracts/              # Variables & mixins
│       ├── base/                   # Global styles
│       ├── themes/                 # Theme definitions
│       └── components/             # Component styles
├── assets/                         # Static assets
└── public/
    └── themify-icons/              # Local icon assets
```

## 🚀 Quick Start

### 1. **Customize Your Profile**

Edit `src/app/core/config/profile.config.ts`:

```typescript
export const PROFILE_CONFIG: ProfileConfig = {
  name: 'Your Name',
  tagline: 'Your Professional Tagline',
  profileImage: 'https://your-image-url.com/photo.jpg',
  
  links: [
    {
      id: 'github',
      title: 'GitHub Profile',
      description: 'Check out my open source projects',
      url: 'https://github.com/yourusername',
      icon: 'ti-github',
      isActive: true,
      sortOrder: 1,
      category: 'work'
    },
    // Add more links...
  ],

  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    email: 'mailto:hello@yourdomain.com'
  }
};
```

### 2. **Install & Run**

```bash
npm install
npm start           # Development server
npm run build      # Production build
```

### 3. **Deploy**

Deploy to any static hosting platform:
- **Vercel**: Connect GitHub repo
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use GitHub Actions

## 🎯 Configuration Guide

### **Adding Links**

```typescript
{
  id: 'unique-id',
  title: 'Link Title',
  description: 'Optional description',
  url: 'https://your-link.com',
  icon: 'ti-icon-name',        // Themify icon
  isActive: true,              // Show/hide link
  sortOrder: 1,                // Display order
  category: 'work'             // Organization
}
```

### **Categories**
- `work`: Professional links (GitHub, LinkedIn, Portfolio)
- `social`: Social media (Twitter, Instagram, YouTube)
- `personal`: Personal links (Blog, Contact, Calendar)
- `other`: Miscellaneous links

### **Popular Icons**
- `ti-github` - GitHub
- `ti-linkedin` - LinkedIn
- `ti-twitter` - Twitter
- `ti-email` - Email
- `ti-world` - Website
- `ti-file-text` - Resume
- `ti-video-camera` - YouTube
- `ti-calendar` - Booking
- `ti-pencil` - Blog

[Browse all icons →](https://themify.me/themify-icons)

## 📊 Analytics Setup

Add tracking to your links:

```typescript
analytics: {
  googleAnalytics: 'GA_MEASUREMENT_ID',
  umami: 'UMAMI_WEBSITE_ID',
  plausible: 'PLAUSIBLE_DOMAIN'
}
```

## 🎨 Customization

### **Themes**
The app includes 3 built-in themes:
- **Light**: Clean white with blue accents
- **Dark**: Elegant dark with purple accents
- **Purple**: Soft purple with gradients

### **Adding Custom Themes**
Edit `src/styles/themes/_themes.scss`:

```scss
[data-theme='custom'] {
  --primary-bg: #your-bg-color;
  --accent: #your-accent-color;
  // ... more variables
}
```

### **Styling**
The app uses a modular SCSS architecture:
- **Variables**: `src/styles/abstracts/_variables.scss`
- **Components**: `src/styles/components/`
- **Themes**: `src/styles/themes/_themes.scss`

## 🔧 Advanced Features

### **Link Categories**
Display specific categories:

```html
<app-links category="work"></app-links>      <!-- Work links only -->
<app-links category="social"></app-links>    <!-- Social links only -->
<app-links></app-links>                      <!-- All links -->
```

### **Custom Profile Data**
Override config data:

```html
<app-profile [customProfile]="{
  name: 'Custom Name',
  tagline: 'Custom Tagline',
  profileImage: 'custom-image.jpg'
}"></app-profile>
```

## 📈 Performance

- **Bundle Size**: ~520kB (130kB smaller than Supabase version)
- **Load Time**: <1s on 3G networks
- **SEO**: Angular SSR for better search visibility
- **PWA Ready**: Can be installed as mobile app

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect GitHub repository
2. Vercel auto-detects Angular
3. Deploy!

### **Netlify**
1. `npm run build`
2. Upload `dist/hemantlink/browser` folder
3. Deploy!

### **GitHub Pages**
1. Enable GitHub Pages in repo settings
2. Use GitHub Actions for auto-deployment
3. Point to `dist/hemantlink/browser`

## 🔒 Best Practices

### **Security**
- All external links open in new tabs (`target="_blank"`)
- `rel="noopener noreferrer"` for security
- No sensitive data in config (it's public)

### **Performance**
- Optimized images with `NgOptimizedImage`
- Lazy loading for better initial load
- Minimal dependencies for smaller bundle

### **SEO**
- Server-side rendering enabled
- Semantic HTML structure
- Meta tags for social sharing

### **Accessibility**
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Angular Team** for the amazing framework
- **Bootstrap** for the responsive design system
- **Themify** for the beautiful icon set
- **Vercel** for excellent deployment platform

---

Built with ❤️ using Angular 20 + Bootstrap 5

**Perfect for**: Personal branding, developers, creators, freelancers, and anyone who needs a professional link-in-bio page.