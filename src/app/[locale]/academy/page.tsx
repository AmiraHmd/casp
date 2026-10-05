import { getTranslations } from 'next-intl/server';
import AcademyContent from '@/app/components/Academy/AcademyContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academy' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/academy`,
    },
  };
}

export default async function AcademyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academy' });

  const videos = [
    {
      id: 'tApLH0Ifeso',
      title: t('video1Title'),
      url: 'https://www.youtube.com/embed/tApLH0Ifeso',
    },
    {
      id: '5TcN2QWrn3k',
      title: t('video2Title'),
      url: 'https://www.youtube.com/embed/5TcN2QWrn3k',
    },
    {
      id: 'lJ57AZkpYc4',
      title: t('video3Title'),
      url: 'https://www.youtube.com/embed/lJ57AZkpYc4',
    },
  ];

  const translations = {
    educatorZone: t('educatorZone'),
    title: t('title'),
    subtitle: t('subtitle'),
    exploreVideos: t('exploreVideos'),
    videoDesc: t('videoDesc'),
    watchNow: t('watchNow'),
  };

  return <AcademyContent videos={videos} translations={translations} />;
}
