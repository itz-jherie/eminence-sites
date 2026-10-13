const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const gifsDir = path.join(__dirname, 'public', 'assets', 'gifs');

async function convertGifToWebp(filename) {
  const inputPath = path.join(gifsDir, filename);
  const outputPath = path.join(gifsDir, filename.replace(/\.gif$/i, '.webp'));

  console.log(`Converting ${filename} to WebP...`);
  const start = Date.now();
  try {
    await sharp(inputPath, { animated: true, limitInputPixels: false })
      .webp({ quality: 80, effort: 4 })
      .toFile(outputPath);
    const end = Date.now();
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    console.log(`Success! Saved to ${path.basename(outputPath)}`);
    console.log(`Original: ${(inputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Optimized: ${(outputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Duration: ${((end - start) / 1000).toFixed(2)}s\n`);
  } catch (error) {
    console.error(`Error converting ${filename}:`, error);
  }
}

async function run() {
  const files = ['Brimlux.gif', 'Shots_5.gif', 'Wasset.gif', 'Xibooster.gif', 'kova.gif'];
  for (const file of files) {
    if (fs.existsSync(path.join(gifsDir, file))) {
      await convertGifToWebp(file);
    } else {
      console.log(`File not found: ${file}`);
    }
  }
}

run();
