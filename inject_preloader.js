const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'Riyadabook');

const preloaderScript = `

// --- PRELOAD ALL PAGES ADDED FOR CLOUDFLARE ---
(function preloadAllPages() {
    try {
        if (!bookConfig || !bookConfig.totalPageCount || !bookConfig.normalPath) return;
        console.log("Preloading all " + bookConfig.totalPageCount + " pages from Cloudflare at once...");
        for (var i = 1; i <= bookConfig.totalPageCount; i++) {
            var imgNormal = new Image();
            imgNormal.src = bookConfig.normalPath + i + ".jpg";
            if (bookConfig.largePath && bookConfig.largePath !== bookConfig.normalPath) {
                var imgLarge = new Image();
                imgLarge.src = bookConfig.largePath + i + ".jpg";
            }
        }
    } catch (err) {
        console.error("Preload failed", err);
    }
})();
// -----------------------------------------------
`;

for (let i = 2; i <= 9; i++) {
  const targetJS = path.join(publicDir, 'Riyada' + i, 'mobile', 'javascript', 'config.js');
  if (fs.existsSync(targetJS)) {
    let content = fs.readFileSync(targetJS, 'utf8');
    if (!content.includes('PRELOAD ALL PAGES ADDED')) {
      content += preloaderScript;
      fs.writeFileSync(targetJS, content, 'utf8');
      console.log('Injected preloader into Riyada' + i + '/config.js');
    } else {
      console.log('Already injected in Riyada' + i);
    }
  } else {
    console.log('File not found: ' + targetJS);
  }
}
