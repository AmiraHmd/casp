const fs = require('fs');
const path = require('path');

// Direct Cloudflare R2 CDN URL - bypasses the Next.js /api/books proxy entirely
// Files are served directly from Cloudflare's CDN edge, much faster!
const R2_CDN = 'https://pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev';

const publicDir = path.join(__dirname, 'public', 'Riyadabook');
const srcDir = path.join(__dirname, 'src', 'app', 'components', 'Riyadabook');

for (let i = 2; i <= 9; i++) {
  const bookName = 'Riyada' + i;
  
  // Direct R2 paths - no server overhead
  const normalPath = R2_CDN + '/book-office/Riyada/' + bookName + '/mobile/';
  const thumbPath  = R2_CDN + '/book-office/Riyada/' + bookName + '/thumb/';

  const files = [
    path.join(publicDir, bookName, 'mobile', 'javascript', 'config.js'),
    path.join(srcDir, bookName, 'mobile', 'javascript', 'config.js'),
  ];

  for (const targetJS of files) {
    if (!fs.existsSync(targetJS)) {
      console.log('Skipping (not found): ' + targetJS);
      continue;
    }

    let content = fs.readFileSync(targetJS, 'utf8');

    // Replace the old proxy paths with direct CDN paths
    // Pattern: bookConfig.normalPath="...(any path)...";
    content = content.replace(
      /bookConfig\.normalPath\s*=\s*"[^"]*";/g,
      'bookConfig.normalPath="' + normalPath + '";'
    );
    content = content.replace(
      /bookConfig\.largePath\s*=\s*"[^"]*";/g,
      'bookConfig.largePath="' + normalPath + '";'
    );
    content = content.replace(
      /bookConfig\.thumbPath\s*=\s*"[^"]*";/g,
      'bookConfig.thumbPath="' + thumbPath + '";'
    );

    fs.writeFileSync(targetJS, content, 'utf8');
    console.log('Updated ' + bookName + ': ' + targetJS);
  }
}
console.log('Done! All books now load directly from the Cloudflare R2 CDN.');
