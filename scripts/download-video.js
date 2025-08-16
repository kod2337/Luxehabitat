const fs = require('fs');
const https = require('https');
const path = require('path');

// Create public/videos directory if it doesn't exist
const videosDir = path.join(__dirname, '../public/videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
  console.log('Created videos directory');
}

// Video URL from Pexels (free stock video)
const videoUrl = 'https://player.vimeo.com/progressive_redirect/redirect/force_redirect/rendition/1080p/file/bf5c71e2829f0dafa8ca9ee4a2fdf51c1b9f2d7b/bf5c71e2829f0dafa8ca9ee4a2fdf51c1b9f2d7b-1080x1920.mp4';
const outputPath = path.join(videosDir, 'hero-showcase.mp4');

// Check if file already exists
if (fs.existsSync(outputPath)) {
  console.log('Video already exists. Skipping download.');
  process.exit(0);
}

console.log('Downloading hero video...');

const file = fs.createWriteStream(outputPath);

https.get(videoUrl, (response) => {
  if (response.statusCode === 200) {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Hero video downloaded successfully!');
    });
  } else {
    console.error(`Failed to download video. Status code: ${response.statusCode}`);
    process.exit(1);
  }
}).on('error', (err) => {
  fs.unlink(outputPath, () => {}); // Delete the file if there's an error
  console.error('Error downloading video:', err);
  process.exit(1);
});
