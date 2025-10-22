# Favicon Setup Instructions

The SVG favicons have been created with your "CN" initials and blue-purple gradient theme.

## Current Status

✅ **Created:**
- `favicon.svg` - Modern SVG favicon (works in most browsers)
- `icon.svg` - High-resolution version for PWA/manifest

✅ **Updated:**
- `app/layout.tsx` - Added proper favicon links

## Generate PNG/ICO Versions (Recommended)

For maximum browser compatibility, generate PNG and ICO versions from the SVG:

### Option 1: Online Tool (Easiest)
1. Visit **https://realfavicongenerator.net/**
2. Upload `public/icon.svg`
3. Download the generated favicon package
4. Extract these files to `public/`:
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`
   - `favicon.ico` (optional, for older browsers)

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first: https://imagemagick.org/

# Generate 16x16
magick public/icon.svg -resize 16x16 public/favicon-16x16.png

# Generate 32x32
magick public/icon.svg -resize 32x32 public/favicon-32x32.png

# Generate Apple Touch Icon
magick public/icon.svg -resize 180x180 public/apple-touch-icon.png

# Generate ICO (multi-size)
magick public/icon.svg -resize 16x16 -resize 32x32 -resize 48x48 public/favicon.ico
```

### Option 3: Use Figma/Sketch/Photoshop
1. Open `public/icon.svg`
2. Export as PNG at these sizes:
   - 16x16 → `favicon-16x16.png`
   - 32x32 → `favicon-32x32.png`
   - 180x180 → `apple-touch-icon.png`

## Browser Fallback

If PNG files are not generated, the SVG will still work in modern browsers. The application will gracefully fall back:
- Modern browsers → Use `favicon.svg`
- Older browsers → Will not show favicon until PNG/ICO is added

## Verify Installation

1. Run your dev server: `npm run dev`
2. Open http://localhost:3000
3. Check the browser tab - you should see the "CN" favicon
4. Check browser console for any 404 errors on favicon files

## Optional: Add to Site Manifest

For PWA support, create `public/site.webmanifest`:

```json
{
  "name": "Chris Nattress Portfolio",
  "short_name": "CN Portfolio",
  "icons": [
    {
      "src": "/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ],
  "theme_color": "#1e293b",
  "background_color": "#1e293b",
  "display": "standalone"
}
```

Then add to `app/layout.tsx`:
```html
<link rel="manifest" href="/site.webmanifest" />
```

---

**Note:** The SVG favicons match your site's blue (#3b82f6) to purple (#a855f7) gradient theme.
