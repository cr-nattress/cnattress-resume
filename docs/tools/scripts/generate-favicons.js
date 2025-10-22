/**
 * Generate Favicon Files
 *
 * This script generates all required favicon sizes from the source SVG file.
 * Run with: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const svgPath = path.join(publicDir, 'favicon.svg');

// Favicon sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from SVG...\n');

  // Check if source SVG exists
  if (!fs.existsSync(svgPath)) {
    console.error('❌ Error: favicon.svg not found in public directory');
    process.exit(1);
  }

  // Read SVG file
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate each size
  for (const { name, size } of sizes) {
    try {
      const outputPath = path.join(publicDir, name);

      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Error generating ${name}:`, error.message);
    }
  }

  console.log('\n🎉 Favicon generation complete!');
  console.log('\nGenerated files:');
  sizes.forEach(({ name }) => console.log(`  - public/${name}`));
}

// Run the generator
generateFavicons().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
