// npm install sharp

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Configuration
const inputDir = "src/images"; // Input directory
const outputDir = "src/output"; // Output directory
const maxThreads = os.cpus().length; // Use the number of CPU cores for parallel processing
const quality = 50; // Adjust AVIF quality (0-100)

/**
 * Converts a single image to AVIF format.
 * @param {string} inputPath - Path to the input image.
 * @param {string} outputPath - Path to save the converted image.
 */
async function convertToAvif(inputPath, outputPath) {
  try {
    await sharp(inputPath).toFormat("avif", { quality }).toFile(outputPath);
    console.log(`✔ Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`✖ Failed to convert ${inputPath}:`, error.message);
  }
}

/**
 * Gets all valid image files in the specified directory.
 * @param {string} dir - The directory to scan.
 * @returns {string[]} - Array of valid image file paths.
 */
function getValidImages(dir) {
  const validExtensions = [".png", ".jpg", ".jpeg", ".webp"];
  return fs
    .readdirSync(dir)
    .filter((file) =>
      validExtensions.includes(path.extname(file).toLowerCase())
    )
    .map((file) => path.join(dir, file));
}

/**
 * Processes images in batches for parallel conversion.
 * @param {string[]} files - Array of image file paths.
 */
async function processImages(files) {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create a queue to process images in batches
  const promises = [];
  for (const file of files) {
    const outputFileName = `${path.basename(file, path.extname(file))}.avif`;
    const outputPath = path.join(outputDir, outputFileName);

    // Push the conversion promise to the queue
    promises.push(convertToAvif(file, outputPath));

    // If the number of promises reaches maxThreads, wait for them to finish
    if (promises.length >= maxThreads) {
      await Promise.all(promises);
      promises.length = 0; // Clear the queue
    }
  }

  // Wait for any remaining promises
  if (promises.length > 0) {
    await Promise.all(promises);
  }
}

/**
 * Main function to handle the conversion process.
 */
async function main() {
  console.log("🔍 Scanning for images...");
  const files = getValidImages(inputDir);

  if (files.length === 0) {
    console.log("⚠ No valid images found in the input directory.");
    return;
  }

  console.log(`🚀 Found ${files.length} images. Starting conversion...`);
  await processImages(files);
  console.log("✅ Image conversion complete!");
}

// Run the script
main().catch((error) => console.error("Unexpected error:", error));
