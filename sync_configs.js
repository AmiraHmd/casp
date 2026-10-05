const fs = require('fs');
const path = require('path');

// Sync the modified config.js files from public back to src/app/components/Riyadabook
// Source (public) -> Dest (src components)
const publicDir = path.join(__dirname, 'public', 'Riyadabook');
const srcDir = path.join(__dirname, 'src', 'app', 'components', 'Riyadabook');

for (let i = 2; i <= 9; i++) {
  const srcFile = path.join(publicDir, 'Riyada' + i, 'mobile', 'javascript', 'config.js');
  const destFile = path.join(srcDir, 'Riyada' + i, 'mobile', 'javascript', 'config.js');
  
  if (fs.existsSync(srcFile) && fs.existsSync(destFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log('Synced Riyada' + i + ' config.js to src/app/components');
  } else if (!fs.existsSync(destFile)) {
    // dest dir may not have mobile for books 3-9 (were deleted), skip
    console.log('Skipping Riyada' + i + ' (dest not found - expected for R3-R9 with deleted folders)');
  } else {
    console.log('src not found for Riyada' + i);
  }
}
console.log('Done!');
