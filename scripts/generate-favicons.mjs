import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'public', 'mbsolarlogo.png');

async function getAlphaBounds(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const visible = a > 24 && (r + g + b) > 30;
      if (!visible) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (maxX <= minX || maxY <= minY) {
    throw new Error('Could not detect logo bounds');
  }

  const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.04);
  return {
    left: Math.max(0, minX - pad),
    top: Math.max(0, minY - pad),
    width: Math.min(width, maxX - minX + 1 + pad * 2),
    height: Math.min(height, maxY - minY + 1 + pad * 2),
  };
}

async function squareLogo(size) {
  const bounds = await getAlphaBounds(source);
  const cropped = await sharp(source).extract(bounds).toBuffer();
  const meta = await sharp(cropped).metadata();
  const side = Math.max(meta.width, meta.height);

  return sharp(cropped)
    .extend({
      top: Math.floor((side - meta.height) / 2),
      bottom: Math.ceil((side - meta.height) / 2),
      left: Math.floor((side - meta.width) / 2),
      right: Math.ceil((side - meta.width) / 2),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(size, size, { fit: 'cover' })
    .png()
    .toBuffer();
}

async function writePng(path, buffer) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, buffer);
  console.log('wrote', path);
}

const sizes = [
  [16, join(root, 'public', 'favicon-16x16.png')],
  [32, join(root, 'public', 'favicon-32x32.png')],
  [48, join(root, 'src', 'app', 'icon.png')],
  [180, join(root, 'public', 'apple-touch-icon.png')],
  [180, join(root, 'src', 'app', 'apple-icon.png')],
];

for (const [size, path] of sizes) {
  const buf = await squareLogo(size);
  await writePng(path, buf);
}
