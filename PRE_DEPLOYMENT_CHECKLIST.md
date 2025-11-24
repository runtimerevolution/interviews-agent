# Pre-Deployment Checklist

## Before Deploying to Vercel

### 1. Test Build Locally ✅
```bash
yarn build
yarn preview
```

Visit http://localhost:4173 and verify:
- [ ] App loads correctly
- [ ] All routes work
- [ ] Images display properly
- [ ] No console errors

### 2. Verify Image Paths ✅
```bash
# Check images exist in build
find dist -name "*.png"

# Test image endpoint
curl -I http://localhost:4173/images/rails/polymorphic_associations.png
```

Should return: `HTTP/1.1 200 OK`

### 3. Test API Endpoints (if applicable) ✅
```bash
# Test code session API
curl http://localhost:4173/api/code-session?sessionId=test-123
```

### 4. Environment Variables
- [ ] `VITE_OPENAI_API_KEY` set in Vercel dashboard
- [ ] All other required env vars configured

### 5. Git Status ✅
```bash
git status
git add .
git commit -m "Deploy: [description of changes]"
git push
```

### 6. Deploy to Vercel ✅
```bash
vercel --prod
```

## Post-Deployment Verification

### 1. Check Deployment URL
Visit your production URL: https://your-app.vercel.app

### 2. Verify Images Load
- [ ] Navigate to a question with an image
- [ ] Image displays correctly
- [ ] No broken image icon
- [ ] Check browser DevTools Network tab for HTTP 200

Direct test:
```bash
curl -I https://your-app.vercel.app/images/rails/polymorphic_associations.png
```

### 3. Test Core Functionality
- [ ] Home page loads
- [ ] Can select a technology
- [ ] Can start an interview
- [ ] Questions display correctly
- [ ] Can score questions
- [ ] Can add comments
- [ ] Can share code editor link
- [ ] Code editor opens
- [ ] Can type and save code
- [ ] Real-time sync works between windows
- [ ] Can finish interview
- [ ] Report generates correctly
- [ ] AI insights generate (if OpenAI key configured)

### 4. Test Real-Time Collaboration
1. [ ] Open interview and share code editor link
2. [ ] Open link in incognito window
3. [ ] Type code in Window 1 → Click Save
4. [ ] Verify code appears in Window 2 within 3 seconds
5. [ ] Type in Window 2 → Click Save
6. [ ] Verify code appears in Window 1 within 3 seconds

### 5. Check Console for Errors
- [ ] No JavaScript errors in browser console
- [ ] No 404s for static assets
- [ ] No CORS errors

### 6. Test on Different Devices
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari
- [ ] Mobile Chrome
- [ ] Mobile Safari

## Common Issues & Quick Fixes

### Images Not Loading
```bash
# Verify vercel.json
cat vercel.json

# Check if images in dist
find dist -name "*.png"

# Clear Vercel cache
# Vercel Dashboard → Settings → Data Cache → Clear All
```

### API Not Working
- Check Vercel Functions logs in dashboard
- Verify API routes are deployed: `https://your-app.vercel.app/api/code-session?sessionId=test`

### Environment Variables
- Go to Vercel Dashboard
- Project Settings → Environment Variables
- Add `VITE_OPENAI_API_KEY`
- Redeploy

### Routing Issues
- Verify `vercel.json` rewrites
- Check for conflicts between API routes and static assets

## Rollback Plan

If deployment fails:

1. **Revert to previous deployment:**
   - Go to Vercel Dashboard
   - Deployments tab
   - Find last working deployment
   - Click "..." menu → "Promote to Production"

2. **Or rollback Git:**
   ```bash
   git revert HEAD
   git push
   vercel --prod
   ```

## Performance Checklist

- [ ] Bundle size < 1MB (check Vite output)
- [ ] Images optimized (use WebP when possible)
- [ ] No unnecessary console.logs in production
- [ ] Lazy loading for heavy components
- [ ] CDN caching configured (in vercel.json)

## Security Checklist

- [ ] OpenAI API key stored in environment variables (not in code)
- [ ] CORS properly configured
- [ ] No sensitive data in client-side code
- [ ] CSRF protection enabled
- [ ] Content Security Policy configured (if needed)

## Monitoring

After deployment:
- [ ] Monitor Vercel Analytics
- [ ] Check for error spikes
- [ ] Verify API usage within limits
- [ ] Test from different geographic regions

