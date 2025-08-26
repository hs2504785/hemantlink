# 📁 Folder Structure Guide - Angular 20

## 🎯 **public/ vs assets/ - Complete Guide**

### 🌍 **public/ Folder** (Static files served directly)

```
public/
├── favicon.ico              # Browser tab icon
├── robots.txt              # SEO crawling instructions
├── manifest.json           # PWA manifest
├── sitemap.xml             # SEO sitemap (optional)
├── google-verification.html # SEO verification (optional)
└── themify-icons/          # Third-party icon library
    ├── themify-icons.css
    ├── fonts/
    └── ...
```

**Characteristics:**

- ✅ Served at **root URL** (`/favicon.ico`, `/robots.txt`)
- ✅ **No processing** by Angular build system
- ✅ **No cache busting** (filenames don't change)
- ✅ Perfect for **SEO files** and **third-party assets**
- ✅ Accessible directly: `https://yoursite.com/filename.ext`

### 📦 **src/assets/ Folder** (Processed by Angular)

```
src/assets/
├── images/                 # App images (logos, photos, etc.)
│   ├── profile.jpg         # Profile photo
│   ├── logo.png           # App logo
│   └── backgrounds/        # Background images
├── documents/              # Downloadable files
│   ├── resume.pdf         # Resume/CV
│   └── portfolio.pdf      # Portfolio
├── data/                   # JSON data files
│   ├── config.json        # App configuration
│   └── content.json       # Dynamic content
├── fonts/                  # Custom fonts (if not using CDN)
└── icons/                  # Custom SVG icons (app-specific)
```

**Characteristics:**

- ✅ **Processed and optimized** by Angular
- ✅ **Cache busting** with hashed filenames
- ✅ Accessible at: `assets/folder/filename.ext`
- ✅ Perfect for **app content** that might change
- ✅ Integrated with Angular's asset pipeline

## 🔧 **Usage Examples**

### **HTML Templates**

```html
<!-- ❌ Don't reference public/ files in templates -->
<img src="/themify-icons/icon.png" alt="Icon" />

<!-- ✅ Reference assets/ files in templates -->
<img src="assets/images/profile.jpg" alt="Profile" />
<a href="assets/documents/resume.pdf">Download Resume</a>
```

### **CSS/SCSS**

```scss
/* ✅ Reference assets/ in stylesheets */
.hero {
  background-image: url('/assets/images/hero-bg.jpg');
}

/* ✅ Reference public/ for direct access */
@import url('/themify-icons/themify-icons.css');
```

### **TypeScript/Components**

```typescript
// ✅ Assets folder references
export const PROFILE_CONFIG = {
  profileImage: 'assets/images/profile.jpg',
  resumeUrl: 'assets/documents/resume.pdf',
};
```

### **Index.html** (public/ files)

```html
<!-- ✅ Direct references to public/ files -->
<link rel="icon" href="favicon.ico" />
<link rel="manifest" href="manifest.json" />
<link rel="stylesheet" href="themify-icons/themify-icons.css" />
```

## 🎯 **Decision Matrix**

| File Type             | Use public/ | Use assets/ | Reason                        |
| --------------------- | ----------- | ----------- | ----------------------------- |
| favicon.ico           | ✅          | ❌          | Browser expects at root       |
| robots.txt            | ✅          | ❌          | SEO crawlers expect at root   |
| manifest.json         | ✅          | ❌          | PWA standard location         |
| Third-party libraries | ✅          | ❌          | No processing needed          |
| Profile images        | ❌          | ✅          | App content, might change     |
| Resume PDF            | ❌          | ✅          | App content, might update     |
| Custom fonts          | ❌          | ✅          | App assets, need optimization |
| App icons/logos       | ❌          | ✅          | App branding, might change    |

## 🚀 **Build Output Differences**

### **Development (`ng serve`)**

```
http://localhost:4200/
├── favicon.ico              # From public/
├── robots.txt              # From public/
├── themify-icons/          # From public/
└── assets/
    ├── images/profile.abc123.jpg  # Processed from src/assets/
    └── documents/resume.pdf       # From src/assets/
```

### **Production (`ng build`)**

```
dist/hemantlink/browser/
├── favicon.ico              # Copied as-is from public/
├── robots.txt              # Copied as-is from public/
├── themify-icons/          # Copied as-is from public/
└── assets/
    ├── images/
    │   └── profile.abc123.jpg     # Hashed filename for caching
    └── documents/
        └── resume.def456.pdf      # Hashed filename for caching
```

## 💡 **Best Practices**

### **Use public/ for:**

1. **SEO files**: robots.txt, sitemap.xml
2. **PWA files**: manifest.json, service worker
3. **Browser files**: favicon.ico, apple-touch-icon.png
4. **Third-party libraries**: External CSS, JS, fonts
5. **Verification files**: google-verification.html
6. **Files that need specific URLs**: /robots.txt, /favicon.ico

### **Use assets/ for:**

1. **App images**: logos, photos, illustrations
2. **Documents**: PDFs, resumes, portfolios
3. **Data files**: JSON configurations, content
4. **Custom assets**: fonts, icons, stylesheets
5. **Content that might change**: user uploads, dynamic content

### **Pro Tips:**

- ✅ **public/**: Files that browsers/crawlers expect at specific URLs
- ✅ **assets/**: Files that are part of your application
- ✅ Use **absolute paths** for public/ files: `/filename.ext`
- ✅ Use **relative paths** for assets/ files: `assets/folder/filename.ext`
- ✅ **Version control**: Both folders should be in Git
- ✅ **Cache strategy**: public/ = long cache, assets/ = auto cache-busting

## 🔄 **Migration from Old Angular**

If upgrading from older Angular versions:

```bash
# Move SEO/PWA files to public/
mv src/favicon.ico public/
mv src/robots.txt public/
mv src/manifest.json public/

# Keep app assets in src/assets/
# (no change needed)
```

This structure follows modern web development standards and aligns Angular with other frameworks like Next.js, Vite, and Create React App.
