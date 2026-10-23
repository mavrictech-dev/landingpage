import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const workspaceRoot = process.cwd();
const iconAzulPath = path.join(workspaceRoot, 'src', 'assets', 'iconazul.svg');
const publicDir = path.join(workspaceRoot, 'public');

// Read source SVG
let svgRaw = fs.readFileSync(iconAzulPath, 'utf8');

// Insert the branded dark background right after </defs>
const backgroundRect = `
  <!-- Brand Dark Background -->
  <rect width="1254" height="1254" rx="240" fill="#070B14" />
`;

const defsEndIndex = svgRaw.indexOf('</defs>');
if (defsEndIndex === -1) {
  throw new Error('Could not find </defs> in iconazul.svg');
}

const brandedSvg = svgRaw.slice(0, defsEndIndex + 7) + backgroundRect + svgRaw.slice(defsEndIndex + 7);

// 1. Write public/icon.svg
const targetSvgPath = path.join(publicDir, 'icon.svg');
fs.writeFileSync(targetSvgPath, brandedSvg, 'utf8');
console.log('Generated public/icon.svg');

// 2. Helper to create ICO binary
function createIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const dirEntrySize = 16;
  const entries = [];
  let offset = 6 + images.length * dirEntrySize;

  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
}

async function generateAll() {
  const svgBuffer = Buffer.from(brandedSvg);

  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 96, name: 'favicon-96x96.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'favicon-192x192.png' },
    { size: 512, name: 'favicon-512x512.png' },
  ];

  const generatedBuffers = {};

  for (const item of sizes) {
    const pngBuffer = await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png({ compressionLevel: 9 })
      .toBuffer();

    fs.writeFileSync(path.join(publicDir, item.name), pngBuffer);
    generatedBuffers[item.size] = pngBuffer;
    console.log(`Generated public/${item.name}`);
  }

  // Generate public/favicon.ico with 16, 32, and 48
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: generatedBuffers[16] },
    { width: 32, height: 32, buffer: generatedBuffers[32] },
    { width: 48, height: 48, buffer: generatedBuffers[48] },
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Generated public/favicon.ico');
}

generateAll().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
