import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR = "./skills";
const OUTPUT_DIR = "./resized";

const SCALE = 0.25;

async function resizeImages() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = fs.readdirSync(INPUT_DIR);

  const images = files.filter((file) =>
    /\.(jpg|jpeg|png|webp|gif|avif|tiff)$/i.test(file)
  );

  await Promise.all(
    images.map(async (filename) => {
      const inputPath = path.join(INPUT_DIR, filename);
      const outputPath = path.join(OUTPUT_DIR, filename);

      try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        const width = Math.round(metadata.width * SCALE);
        const height = Math.round(metadata.height * SCALE);

        await image
          .resize(width, height)
          .toFile(outputPath);

        console.log(`✓ ${filename} → ${width}x${height}`);
      } catch (error) {
        console.error(`✗ ${filename} → ${error.message}`);
      }
    })
  );

  console.log(`\nDone: ${images.length} images`);
}

resizeImages();
