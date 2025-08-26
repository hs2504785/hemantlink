# Profile Configuration

This directory contains the configuration files for your link-in-bio app.

## 📝 How to Customize Your Profile

### 1. **Edit Profile Information**

Open `profile.config.ts` and update the `PROFILE_CONFIG` object:

```typescript
export const PROFILE_CONFIG: ProfileConfig = {
  name: 'Your Name',
  tagline: 'Your professional tagline',
  profileImage: 'https://your-image-url.com/photo.jpg',
  // ... rest of config
};
```

### 2. **Add/Remove Links**

Update the `links` array in the config:

```typescript
links: [
  {
    id: 'unique-id',
    title: 'Link Title',
    description: 'Optional description',
    url: 'https://your-link.com',
    icon: 'ti-icon-name', // Themify icon class
    isActive: true,
    sortOrder: 1,
    category: 'work' // 'social' | 'work' | 'personal' | 'other'
  },
  // ... more links
]
```

### 3. **Available Themify Icons**

Common icons you can use:
- `ti-github` - GitHub
- `ti-linkedin` - LinkedIn  
- `ti-twitter` - Twitter
- `ti-email` - Email
- `ti-world` - Website
- `ti-file-text` - Resume/Document
- `ti-video-camera` - YouTube/Video
- `ti-pencil` - Blog/Writing
- `ti-calendar` - Calendar/Booking
- `ti-phone` - Phone
- `ti-location-pin` - Location

See all icons at: [Themify Icons](https://themify.me/themify-icons)

### 4. **Analytics Setup**

Add your analytics IDs to track link clicks:

```typescript
analytics: {
  googleAnalytics: 'GA_MEASUREMENT_ID',
  umami: 'UMAMI_WEBSITE_ID',
  plausible: 'PLAUSIBLE_DOMAIN'
}
```

### 5. **Categories**

Organize your links into categories:
- **work**: Professional links (GitHub, LinkedIn, Portfolio)
- **social**: Social media links (Twitter, Instagram)
- **personal**: Personal links (Blog, Contact)
- **other**: Miscellaneous links

### 6. **Link Order**

Control the order of links with `sortOrder`. Lower numbers appear first.

## 🎯 Benefits of This Approach

- ✅ **Simple**: Just edit a TypeScript file
- ✅ **Fast**: No API calls, instant loading
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Version controlled**: Track changes in Git
- ✅ **No dependencies**: No external services needed
- ✅ **Analytics ready**: Built-in tracking support

## 🚀 Deployment

When you deploy your app, the config is compiled into the build. No server or database needed!

Just update the config file and redeploy. Perfect for static hosting on:
- Vercel
- Netlify
- GitHub Pages
- Any static host
