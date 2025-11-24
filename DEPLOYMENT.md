# Deployment Guide - Vercel

## Quick Deploy

```bash
vercel --prod
```

## Static Assets (Images)

### Issue
Images in the `public/images/` folder were not appearing in production because Vercel's routing configuration was redirecting all requests (including images) to `index.html`.

### Solution
The `vercel.json` has been updated to:

1. **Exclude images from SPA rewrites**: The regex `/((?!images/).*)` excludes any path containing `/images/` from being rewritten to `index.html`
2. **Add caching headers**: Images are cached for 1 year for better performance
3. **Explicit public directory**: Vite config ensures the `public` folder is copied to build output

### Configuration

**vercel.json:**
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/((?!images/).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**vite.config.js:**
```javascript
export default defineConfig({
  plugins: [react(), apiPlugin()],
  publicDir: 'public',
  build: {
    assetsInlineLimit: 0, // Don't inline images
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep the public folder structure
          if (assetInfo.name && assetInfo.name.includes('images/')) {
            return assetInfo.name;
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})
```

## Folder Structure

```
interviews-agent/
├── public/
│   └── images/
│       └── rails/
│           └── polymorphic_associations.png  ← Images here
├── src/
│   └── data/
│       └── questions_rails.js  ← References: /images/rails/...
```

## Image Paths in Code

Always use **absolute paths from the public root**:

✅ **Correct:**
```javascript
{
  "image": "/images/rails/polymorphic_associations.png"
}
```

❌ **Incorrect:**
```javascript
{
  "image": "../public/images/rails/polymorphic_associations.png"
}
{
  "image": "./images/rails/polymorphic_associations.png"
}
```

## Adding New Images

1. Place images in `public/images/[technology]/`
2. Reference them in question files using absolute paths:
   ```javascript
   {
     "image": "/images/[technology]/[filename].png"
   }
   ```
3. Commit and push to Git
4. Deploy: `vercel --prod`

## Verifying Images in Production

After deployment, check:

1. **Direct URL**: `https://your-app.vercel.app/images/rails/polymorphic_associations.png`
2. **In Code Editor**: Open a question with an image and verify it displays
3. **Browser DevTools Network Tab**: Check if image loads with HTTP 200

## Troubleshooting

### Images Not Loading

**Check 1: Verify file exists in repo**
```bash
ls -la public/images/rails/
```

**Check 2: Check Vercel build logs**
Look for errors during the build process in Vercel dashboard.

**Check 3: Test the direct URL**
```bash
curl -I https://your-app.vercel.app/images/rails/polymorphic_associations.png
```

Should return `HTTP/2 200` (not 404 or 301)

**Check 4: Verify vercel.json syntax**
Make sure the JSON is valid and the regex is correct.

**Check 5: Clear Vercel cache**
In Vercel dashboard: Settings → Data Cache → Clear All Cache

### Images Work Locally But Not in Production

This usually means:
1. File not committed to Git
2. Vercel build configuration issue
3. Caching issue in Vercel/CDN

**Solution:**
```bash
# Make sure images are tracked by Git
git add public/images/
git commit -m "Add images"
git push

# Redeploy
vercel --prod
```

### 404 on Image Paths

If images return 404, the rewrite rule might be catching them.

**Fix:** Update `vercel.json` to exclude more paths:
```json
{
  "source": "/((?!images/|vite\\.svg).*)",
  "destination": "/index.html"
}
```

## Performance Optimization

### Image Formats
- Use WebP for better compression
- Provide fallbacks for older browsers
- Consider using `<picture>` element

### Lazy Loading
Images in the Code Editor are only loaded when needed, improving initial page load.

### CDN Caching
Vercel automatically serves images from their global CDN with the caching headers we've configured.

## Environment-Specific Paths

If you need different paths for dev vs. production:

```javascript
const imageBasePath = import.meta.env.PROD
  ? '/images'
  : '/images';

const imagePath = `${imageBasePath}/rails/polymorphic_associations.png`;
```

## Build Test Locally

Before deploying, test the production build locally:

```bash
# Build
yarn build

# Preview
yarn preview

# Test images
curl -I http://localhost:4173/images/rails/polymorphic_associations.png
```

Should return `HTTP/1.1 200 OK`

