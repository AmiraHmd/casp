import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://centerarabic.com';
  
  // Supported locales
  const locales = ['ar', 'en', 'fr'];
  
  // Base routes that exist for every locale
  const baseRoutes = [
    '',
    '/store',
    '/store/printed-books',
    '/store/ebooks',
    '/teacher-guide',
    '/platform',
    '/services',
    '/channel'
  ];

  // Store Products
  const storeProducts = [
    '/store/qawaed-mobasta',
    '/store/al-mufid',
    '/store/al-shamil',
    '/store/al-wafi',
    '/store/garden-of-arabic',
    '/store/hidayah',
    '/store/hidayah-en',
    '/store/hidayah-fr',
    '/store/tareeq-al-muneer',
    '/store/tareeq-al-muneer-en',
    '/store/tareeq-al-muneer-fr',
    '/store/the-happy-muslim'
  ];

  // Teacher Guides
  const teacherGuides = [
    '/teacher-guide/garden-guide',
    '/teacher-guide/happyMuslim-guide',
    '/teacher-guide/mufid-guide',
    '/teacher-guide/wafi-guide'
  ];

  // Platforms
  const platforms = [
    '/platform/mybook-platform',
    '/platform/qalamnet-platform',
    '/platform/wafi-platform'
  ];

  const allRoutes = [...baseRoutes, ...storeProducts, ...teacherGuides, ...platforms];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate localized URLs for every route
  locales.forEach((locale) => {
    allRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : route.includes('/store/') ? 0.9 : 0.8,
      });
    });
  });

  // Include the non-localized root URL
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  return sitemapEntries;
}
