import sharp from 'sharp';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC  = path.join(ROOT, 'assets', 'screenshots', 'src');
const OUT  = path.join(ROOT, 'assets', 'screenshots');

const NAMES = [
  'gxd-dashboard',
  'gxd-myday',
  'gxd-signs',
  'gxd-schedule',
  'gxd-help',
  'itin-group',
  'itin-schedule',
  'itin-building',
];

async function resize(name) {
  const src = path.join(SRC, `${name}.png`);

  const out2x = path.join(OUT, `${name}@2x.png`);
  const meta2x = await sharp(src)
    .resize({ width: 640 })
    .sharpen({ sigma: 0.6, m1: 0.8, m2: 0.4 })
    .png({ compressionLevel: 9 })
    .toFile(out2x);
  console.log(`${name}@2x.png  →  ${meta2x.width}×${meta2x.height}  (${(meta2x.size / 1024).toFixed(0)} KB)`);

  const out1x = path.join(OUT, `${name}@1x.png`);
  const meta1x = await sharp(src)
    .resize({ width: 320 })
    .sharpen({ sigma: 0.5, m1: 0.9, m2: 0.3 })
    .png({ compressionLevel: 9 })
    .toFile(out1x);
  console.log(`${name}@1x.png  →  ${meta1x.width}×${meta1x.height}  (${(meta1x.size / 1024).toFixed(0)} KB)`);
}

console.log('Generating @1x / @2x screenshots from 1080×2400 sources…\n');
for (const name of NAMES) {
  await resize(name);
}
console.log('\nDone.');
