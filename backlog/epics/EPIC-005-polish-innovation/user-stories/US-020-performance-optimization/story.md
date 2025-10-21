# US-020: Performance Optimization

**Story ID:** US-020
**Epic:** EPIC-005 - Polish & Innovation
**Status:** To Do
**Priority:** 🔴 Critical
**Story Points:** 8
**Estimated Time:** 3-4 hours

---

## User Story

**As a** visitor to the portfolio website
**I want** the site to load instantly and respond smoothly to all interactions
**So that** I have a premium, frustration-free experience regardless of my device or connection speed

---

## Acceptance Criteria

### Lighthouse Scores
- [ ] Performance: 95+ (target: 98)
- [ ] Accessibility: 100
- [ ] Best Practices: 100
- [ ] SEO: 100

### Core Web Vitals
- [ ] First Contentful Paint (FCP): < 1.5 seconds
- [ ] Largest Contentful Paint (LCP): < 2.5 seconds
- [ ] First Input Delay (FID): < 100ms
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Total Blocking Time (TBT): < 200ms
- [ ] Interaction to Next Paint (INP): < 200ms

### Image Optimization
- [ ] All images converted to WebP format
- [ ] Responsive images with srcset implemented
- [ ] Lazy loading on all images below the fold
- [ ] next/image component used throughout
- [ ] Image compression optimized (< 100KB per image)

### Code Optimization
- [ ] Code splitting implemented for each major section
- [ ] Dynamic imports for heavy components (3D, charts)
- [ ] Tree shaking enabled and verified
- [ ] Bundle size analyzed and minimized
- [ ] No unused dependencies in package.json

### Caching & PWA
- [ ] Service worker implemented with Workbox
- [ ] Static assets cached with proper strategy
- [ ] API responses cached where appropriate
- [ ] PWA installable on mobile devices
- [ ] Offline support for critical pages

### Font Optimization
- [ ] Font files subset to used characters
- [ ] font-display: swap implemented
- [ ] Preload critical fonts
- [ ] No layout shift from font loading

---

## Technical Notes

### Performance Budget
- Total page weight: < 1.5MB
- JavaScript bundle: < 500KB (gzipped)
- CSS bundle: < 50KB (gzipped)
- Images: < 500KB total per page
- Fonts: < 100KB

### Code Splitting Strategy
```typescript
// Lazy load heavy components
const Timeline = dynamic(() => import('@/components/sections/Timeline'), {
  loading: () => <TimelineSkeleton />,
  ssr: false
});

const TechStack3D = dynamic(() => import('@/components/hero/TechStack3D'), {
  loading: () => <TechStack2D />, // Fallback
  ssr: false
});
```

### Image Optimization
```typescript
// Use next/image for automatic optimization
import Image from 'next/image';

<Image
  src="/project-screenshot.png"
  alt="Project screenshot"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### Service Worker Configuration
```javascript
// workbox-config.js
module.exports = {
  globDirectory: '.next/',
  globPatterns: ['**/*.{html,js,css,png,jpg,webp,svg}'],
  swDest: 'public/sw.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 3600,
        },
      },
    },
  ],
};
```

---

## Definition of Done

- [ ] All Lighthouse scores meet targets
- [ ] All Core Web Vitals pass thresholds
- [ ] All images optimized and lazy-loaded
- [ ] Code splitting implemented
- [ ] Service worker functional
- [ ] PWA installable
- [ ] Bundle size within budget
- [ ] No performance regressions detected
- [ ] Tested on slow 3G connection
- [ ] Tested on low-end mobile device
- [ ] Performance monitoring setup (Web Vitals)

---

## Tasks

This user story contains **6 tasks**:

1. **TASK-024**: Optimize images and implement lazy loading
2. **TASK-025**: Implement code splitting and dynamic imports
3. **TASK-026**: Set up service worker and PWA capabilities
4. **TASK-027**: Optimize fonts and prevent layout shift
5. **TASK-028**: Analyze and reduce bundle size
6. **TASK-029**: Run comprehensive Lighthouse audits and fix issues

---

## Dependencies

**Requires:**
- All features complete (EPIC-001 through EPIC-004)
- All visual effects implemented (US-017, US-018)
- Content finalized

**Blocks:**
- Launch (must be complete before going live)

---

## Verification Steps

### 1. Lighthouse Audit
```bash
# Run Lighthouse in CI mode
lighthouse https://yoursite.com --output html --output-path ./lighthouse-report.html

# Or use Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

### 2. Bundle Analysis
```bash
# Analyze bundle size
npm run build
npm run analyze

# Look for:
# - Large dependencies (can they be lazy loaded?)
# - Duplicate code (can it be deduplicated?)
# - Unused code (can it be removed?)
```

### 3. Network Performance
- Open DevTools → Network tab
- Throttle to "Slow 3G"
- Hard refresh (Ctrl+Shift+R)
- Verify page loads in < 5 seconds

### 4. Image Optimization Verification
```bash
# Check image sizes
find public/images -type f -exec du -h {} \; | sort -rh | head -10

# All images should be < 100KB
# Verify WebP format
```

### 5. PWA Installation
- On mobile device, visit site
- Look for "Add to Home Screen" prompt
- Install PWA
- Verify icon appears on home screen
- Verify app opens without browser chrome

---

## Performance Optimization Checklist

### Critical Path
- [ ] Inline critical CSS
- [ ] Defer non-critical CSS
- [ ] Preload hero image
- [ ] Preconnect to external domains

### JavaScript
- [ ] Remove unused code
- [ ] Minimize third-party scripts
- [ ] Use async/defer for scripts
- [ ] Implement code splitting

### Images
- [ ] Compress images
- [ ] Convert to WebP
- [ ] Implement lazy loading
- [ ] Use responsive images

### Caching
- [ ] Set cache headers
- [ ] Implement service worker
- [ ] Use CDN (Netlify provides this)

### Rendering
- [ ] Minimize DOM size
- [ ] Avoid layout shift
- [ ] Use CSS containment
- [ ] Optimize animations

---

## Expected Outcomes

### Before Optimization
- Lighthouse Performance: ~75
- Page load time: 4-6 seconds
- Bundle size: 800KB+
- Images: Unoptimized PNG/JPG

### After Optimization
- Lighthouse Performance: 95+
- Page load time: < 2 seconds
- Bundle size: < 500KB (gzipped)
- Images: Optimized WebP with lazy loading

---

## Common Performance Issues & Fixes

### Issue: Large bundle size
**Fix:**
```bash
# Analyze bundle
npm run build && npm run analyze

# Common culprits:
# - Moment.js → use date-fns or day.js
# - Lodash → import specific functions
# - Large icon libraries → use only needed icons
```

### Issue: Slow image loading
**Fix:**
- Convert to WebP
- Implement lazy loading
- Use next/image
- Compress images (TinyPNG or Squoosh)

### Issue: Layout shift from fonts
**Fix:**
```css
/* Add font-display: swap */
@font-face {
  font-family: 'CustomFont';
  font-display: swap;
  src: url('/fonts/custom.woff2');
}
```

### Issue: Slow initial page load
**Fix:**
- Implement code splitting
- Lazy load below-the-fold content
- Reduce initial JavaScript payload

---

## Tools for Performance Testing

### Automated Tools
- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: https://www.webpagetest.org/
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Bundle Analyzer**: `npm run analyze`

### Monitoring
- **Web Vitals Extension**: Chrome extension for real-time metrics
- **Vercel Analytics**: If using Vercel
- **Netlify Analytics**: Built-in analytics

---

## Notes

**Performance is a feature, not an afterthought.** Users expect instant, smooth experiences. A slow site signals low quality, even if the content is great.

**Key Success Factors:**
1. Test on real devices, not just DevTools
2. Test on slow connections (3G)
3. Measure before and after optimization
4. Focus on user-perceived performance, not just metrics
5. Don't over-optimize at the expense of features

**Mobile Performance is Critical:**
- 60%+ of traffic is mobile
- Mobile devices are less powerful
- Mobile connections are slower
- Mobile users are more impatient

**Ongoing Monitoring:**
- Set up performance budgets in CI
- Monitor Web Vitals in production
- Get alerts if metrics degrade
- Test with each deployment

---

*Story created: 2025-10-20*
*Last updated: 2025-10-20*
