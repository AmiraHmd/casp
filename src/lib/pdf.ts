import { PDFDocument, degrees } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

export async function watermarkPdf(pdfBuffer: ArrayBuffer) {
  const pdfDoc = await PDFDocument.load(pdfBuffer)
  const pages = pdfDoc.getPages()
  
  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo', 'casp-logo.png')
  const logoBytes = fs.readFileSync(logoPath)
  const logoImage = await pdfDoc.embedPng(logoBytes)
  
  // Scale the logo down if it's too large, or choose a fixed scale.
  // We'll scale it to a reasonable watermark size.
  const logoDimsSmall = logoImage.scale(0.3)
  const logoDimsLarge = logoImage.scale(0.8)
  
  for (const page of pages) {
    const { width, height } = page.getSize()
    
    // 1. Large Central Watermark
    page.drawImage(logoImage, {
      x: width / 2 - logoDimsLarge.width / 2,
      y: height / 2 - logoDimsLarge.height / 2,
      width: logoDimsLarge.width,
      height: logoDimsLarge.height,
      opacity: 0.08,
      rotate: degrees(30),
    })

    // 2. Tiled Grid Watermarks (Reduced density for performance)
    const gridCount = 2
    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        // Offset tiles to not overlap center too much
        const x = (width / gridCount) * i + (width / (gridCount * 2)) - (logoDimsSmall.width / 2)
        const y = (height / gridCount) * j + (height / (gridCount * 2)) - (logoDimsSmall.height / 2)
        
        page.drawImage(logoImage, {
          x,
          y,
          width: logoDimsSmall.width,
          height: logoDimsSmall.height,
          opacity: 0.04,
          rotate: degrees(45),
        })
      }
    }
  }
  
  return await pdfDoc.save()
}
