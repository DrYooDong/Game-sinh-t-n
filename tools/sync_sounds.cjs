const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const srcSounds = path.join(rootDir, 'reference', 'extracted_pak', 'sounds');
const dstSounds = path.join(rootDir, 'public', 'pvz_assets', 'sounds');

if (!fs.existsSync(dstSounds)) {
  fs.mkdirSync(dstSounds, { recursive: true });
}

console.log('Copying sounds from:', srcSounds, 'to:', dstSounds);

const files = fs.readdirSync(srcSounds);
let count = 0;
files.forEach(file => {
  if (file.endsWith('.ogg') || file.endsWith('.wav') || file.endsWith('.mp3')) {
    const srcFile = path.join(srcSounds, file);
    const dstFile = path.join(dstSounds, file.toLowerCase());
    fs.copyFileSync(srcFile, dstFile);
    count++;
  }
});

console.log(`Successfully synchronized ${count} sound files to public/pvz_assets/sounds/`);
