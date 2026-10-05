export function getStoreBookData(bookId: string) {
  if (!bookId) return null;

  let pdfUrl = "";
  let cover = "";
  let icon = "";
  let color = "";
  let borderColor = "";
  let buyUrl = "https://sindbadglobal.com";

  
  // Garden of Arabic
  if (bookId.startsWith("garden-")) {
    const parts = bookId.split("-"); // ['garden', 'R', 'assas']
    const key = parts[1];
    const section = parts[2];
    const isExercises = section === "exercices";
    cover = `/pdfbooks/store-book/garden-book/garden-${key}/${section}/cover/${key}.jpg`;
    pdfUrl = isExercises
      ? `/store-book/garden-book/garden-${key}/${section}/${key}.pdf`
      : `/store-book/garden-book/garden-${key}/${section}/gardenAsses${key}.pdf`;
    icon = 'solar:leaf-bold-duotone';
    color = 'bg-emerald-50 text-emerald-500';
    borderColor = 'border-emerald-300';

    // Buy URL for Garden
    if (key === 'R') {
      buyUrl = isExercises ? "https://sindbadglobal.com/products/garden-kg1-exs" : "https://sindbadglobal.com/products/garden-kg1-txt";
    } else if (key === 'P') {
      buyUrl = isExercises ? "https://sindbadglobal.com/products/garden-kg2-exs" : "https://sindbadglobal.com/products/garden-kg2-txt";
    } else if (key === '4' || key === '5' || key === '6' || key === '7' || key === '8') {
      buyUrl = isExercises ? `https://sindbadglobal.com/products/garden-l${key}-grm` : `https://sindbadglobal.com/products/garden-l${key}-txt`;
    } else {
      buyUrl = isExercises ? `https://sindbadglobal.com/products/garden-l${key}-exs` : `https://sindbadglobal.com/products/garden-l${key}-txt`;
    }
  } 
  
  // Tareeq Al Muneer (Arabic)
  else if (bookId.startsWith("tareeq-ar-")) {
    const key = bookId.replace("tareeq-ar-", "");
    const assetKey = key === 'P' ? 'p' : key;
    cover = `/pdfbooks/store-book/tarikmunirAr-book/tarikmunirAr-${key}/1-${assetKey}.jpg`;
    pdfUrl = `/api/books/store-book/tarikmunirAr-book/tarikmunirAr-${key}/1-${assetKey}.pdf`;
    
    icon = 'solar:map-point-bold-duotone';
    color = "bg-amber-50 text-amber-500";
    borderColor = "border-amber-300";

    if (key === 'R') buyUrl = "https://sindbadglobal.com/collections/bright-path/products/munir-kg1";
    else if (key === 'P') buyUrl = "https://sindbadglobal.com/collections/bright-path/products/munir-kg2";
    else buyUrl = `https://sindbadglobal.com/collections/bright-path/products/munir-l${key}`;
  }

  // The Happy Muslim (English)
  else if (bookId.startsWith("happymuslim-en-")) {
    const key = bookId.replace("happymuslim-en-", "");
    cover = `/pdfbooks/store-book/happymuslimEn-book/happymuslimEn-${key}/cover/${key}-1.png`;
    pdfUrl = `/api/books/store-book/happymuslimEn-book/happymuslimEn-${key}/${key}-1.pdf`;
    
    icon = 'solar:smile-circle-bold-duotone';
    color = "bg-blue-50 text-blue-500";
    borderColor = "border-blue-300";

    if (key === 'R') buyUrl = "https://sindbadglobal.com/collections/the-happy-muslim/products/happy-kg1";
    else if (key === 'P') buyUrl = "https://sindbadglobal.com/collections/the-happy-muslim/products/happy-kg2";
    else buyUrl = `https://sindbadglobal.com/collections/the-happy-muslim/products/happy-l${key}`;
  }

  // Al Mufid
  else if (bookId.startsWith("mufid-")) {
    const key = bookId.replace("mufid-", "");
    const folderKey = key;
    cover = `/pdfbooks/store-book/mufid-book/mufid-${folderKey}/${folderKey}-1.png`;
    pdfUrl = `/api/books/store-book/mufid-book/mufid-${folderKey}/${folderKey}-1.pdf`;
    color = "bg-amber-50 text-amber-500";
    icon = 'solar:notebook-bold-duotone';
    borderColor = "border-amber-300";
    buyUrl = `https://sindbadglobal.com/collections/al-mofeed-in-learning-arabic/products/mufid-l${key}`;
  }

  // Al Shamil
  else if (bookId.startsWith("shamil-")) {
    const key = bookId.replace("shamil-", "");
    cover = `/pdfbooks/store-book/shamil-book/shamil-${key}/${key}.jpg`;
    pdfUrl = `/api/books/store-book/shamil-book/shamil-${key}/${key}.pdf`;
    color = "bg-indigo-50 text-indigo-500";
    icon = 'solar:book-2-bold-duotone';
    borderColor = "border-indigo-300";
    buyUrl = `https://sindbadglobal.com/collections/al-shamil-in-learning-arabic/products/shamil-l${key}`;
  }

  // Al Wafi
  else if (bookId.startsWith("wafi-")) {
    const parts = bookId.split("-");
    const sectionPrefix = parts[1]; // assas or ex
    const key = parts[2] || parts[1]; // handle both wafi-assas-1 and wafi-1
    const sectionFolder = sectionPrefix === 'ex' ? 'exercices' : 'assas';
    
    cover = `/pdfbooks/store-book/wafi-book/wafi-${key}/${sectionFolder}/cover/${key}-1.png`;
    pdfUrl = `/api/books/store-book/wafi-book/wafi-${key}/${sectionFolder}/${key}-1.pdf`;
    color = "bg-brand-gold-dark text-brand-gold/90";
    icon = 'solar:book-bookmark-bold-duotone';
    borderColor = "border-brand-gold-dark";

    if (sectionPrefix === 'ex') {
      buyUrl = `https://sindbadglobal.com`;
    } else {
      buyUrl = `https://sindbadglobal.com`;
    }
  }

  // Qawaed Mobasta
  else if (bookId.startsWith("qawaed-")) {
    const key = bookId.replace("qawaed-", "");
    cover = `/pdfbooks/store-book/garden-book/garden-${key}/exercices/cover/${key}.jpg`;
    pdfUrl = `/api/books/store-book/garden-book/garden-${key}/exercices/${key}.pdf`;
    icon = 'solar:ruler-pen-bold-duotone';
    color = "bg-lime-50 text-lime-500";
    borderColor = "border-lime-300";
    buyUrl = `https://sindbadglobal.com/products/garden-l${key}-grm`;
  }

  // Hidayah (French)
  else if (bookId.startsWith("hidayah-fr-")) {
    const key = bookId.replace("hidayah-fr-", "");
    cover = `/pdfbooks/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.png`;
    pdfUrl = `/api/books/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.pdf`;
    
    icon = 'solar:moon-stars-bold-duotone';
    color = "bg-blue-50 text-blue-500";
    borderColor = "border-blue-300";
    buyUrl = "https://sindbadglobal.com";
  }

  return {
    pdfUrl,
    cover,
    icon,
    color,
    borderColor,
    buyUrl
  };
}

