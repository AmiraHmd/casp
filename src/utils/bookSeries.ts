/**
 * Utility functions to derive a series slug from a bookId query param
 * or from a decrypted PDF storage path.
 *
 * Series slugs must be consistent across:
 *   - navigation.ts (seriesId)
 *   - OTP cookie names: book_otp_session_{series}, book_otp_verified_{series}
 *   - middleware.ts
 *   - /api/book-reader route
 */

/** Ordered longest-match prefixes (order matters for tareeq-al-muneer / happy-muslim) */
const BOOK_ID_PREFIXES: string[] = [
  'guide-garden',
  'guide-mufid',
  'guide-wafi',
  'guide-happy-muslim',
  'tareeq-al-muneer',
  'happy-muslim',
  'hidayah-fr',
  'qawaed-mobasta',
  'mufid',
  'garden',
  'wafi',
  'shamil',
];

/**
 * Derives the series slug from a bookId URL query-param value.
 *
 * Examples:
 *   'mufid-P'            → 'mufid'
 *   'guide-mufid-P'      → 'mufid'
 *   'garden-R'           → 'garden'
 *   'guide-garden-R'     → 'garden'
 *   'wafi-1'             → 'wafi'
 *   'tareeq-al-muneer-P' → 'tareeq-al-muneer'
 *   'happy-muslim-P'     → 'happy-muslim'
 */
export function getSeriesFromBookId(bookId: string): string {
  let id = bookId;

  // strip "guide-" prefix so guide-mufid-P → mufid-P
  if (id.startsWith('guide-')) {
    id = id.replace(/^guide-/, '');
  }

  for (const prefix of BOOK_ID_PREFIXES.filter(p => !p.startsWith('guide-'))) {
    if (id.startsWith(prefix)) {
      return prefix;
    }
  }

  // fallback: take the first segment before the last dash-key
  const parts = id.split('-');
  return parts[0] ?? 'unknown';
}

/**
 * Derives the series slug from a decrypted R2/S3 PDF path.
 *
 * Examples:
 *   '/book-office/mufid/P.pdf'                          → 'mufid'
 *   '/book-office/garden/assas/P.pdf'                   → 'garden'
 *   '/book-office/wafi/assas/1.pdf'                     → 'wafi'
 *   '/book-office/shamil/1.pdf'                         → 'shamil'
 *   '/book-office/tarikmunirAr/P.pdf'                   → 'tareeq-al-muneer'
 *   '/book-office/hidayaFr/P.pdf'                       → 'hidayah-fr'
 *   '/book-office/happymuslimEn/P.pdf'                  → 'happy-muslim'
 *   '/dalil-book/mufid-guide/mufidGuide-P.pdf'          → 'mufid'
 *   '/dalil-book/garden-guide/gardenGuide-R.pdf'        → 'garden'
 *   '/dalil-book/wafi-guide/wafiGuide-1.pdf'            → 'wafi'
 */
export function getSeriesFromPdfPath(pdfPath: string): string {
  // Dalil (guide) paths
  if (pdfPath.startsWith('/dalil-book/')) {
    const folder = pdfPath.split('/')[2] ?? ''; // e.g. 'mufid-guide'
    if (folder.startsWith('mufid'))        return 'mufid';
    if (folder.startsWith('garden'))       return 'garden';
    if (folder.startsWith('wafi'))         return 'wafi';
    if (folder.startsWith('happyMuslim'))  return 'happy-muslim';
    return folder.replace(/-guide$/, '');
  }

  // Regular book paths
  if (pdfPath.startsWith('/book-office/')) {
    const folder = pdfPath.split('/')[2] ?? ''; // e.g. 'mufid', 'tarikmunirAr'
    if (folder === 'mufid')          return 'mufid';
    if (folder === 'garden')         return 'garden';
    if (folder === 'wafi')           return 'wafi';
    if (folder === 'shamil')         return 'shamil';
    if (folder === 'tarikmunirAr')   return 'tareeq-al-muneer';
    if (folder === 'hidayaFr')       return 'hidayah-fr';
    if (folder === 'happymuslimEn')  return 'happy-muslim';
    if (folder === 'qawaed')         return 'qawaed-mobasta';
    return folder;
  }

  return 'unknown';
}
