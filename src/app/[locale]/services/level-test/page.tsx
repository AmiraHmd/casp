import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Icon } from '@iconify/react';

export const revalidate = 86400; // 24 hours

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'home' });
  return { title: `Level Test | ${t('title')}`, description: t('subtitle') };
}

export default async function LevelTestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  const levels = [
    {
      id: 'eval1',
      title: locale === 'ar' ? 'المستوى الأول' : locale === 'fr' ? 'Niveau 1' : 'Level 1',
      desc: locale === 'ar' ? 'اختبار تحديد المستوى الأول' : locale === 'fr' ? 'Test de niveau 1' : 'Level 1 Placement Test',
      href: '/services/level-test/eval1',
      icon: 'solar:star-fall-bold-duotone',
      color: 'bg-brand-orange',
      blobColor: 'bg-brand-orange',
      textColor: 'text-brand-orange',
    },
    {
      id: 'eval2',
      title: locale === 'ar' ? 'المستوى الثاني' : locale === 'fr' ? 'Niveau 2' : 'Level 2',
      desc: locale === 'ar' ? 'اختبار تحديد المستوى الثاني' : locale === 'fr' ? 'Test de niveau 2' : 'Level 2 Placement Test',
      href: '/services/level-test/eval2',
      icon: 'solar:star-circle-bold-duotone',
      color: 'bg-brand-gold',
      blobColor: 'bg-brand-gold',
      textColor: 'text-brand-gold-dark',
    },
    {
      id: 'eval3',
      title: locale === 'ar' ? 'المستوى الثالث' : locale === 'fr' ? 'Niveau 3' : 'Level 3',
      desc: locale === 'ar' ? 'اختبار تحديد المستوى الثالث' : locale === 'fr' ? 'Test de niveau 3' : 'Level 3 Placement Test',
      href: '/services/level-test/eval3',
      icon: 'solar:stars-bold-duotone',
      color: 'bg-brand-sky',
      blobColor: 'bg-brand-sky',
      textColor: 'text-brand-sky-dark',
    }
  ];

  const pageTitle = locale === 'ar' ? 'اختبار تحديد المستوى' : locale === 'fr' ? 'Test de niveau' : 'Level Test';
  const pageDesc = locale === 'ar' ? 'اختر المستوى المناسب للبدء في الاختبار' : locale === 'fr' ? 'Choisissez le niveau approprié pour commencer le test' : 'Choose the appropriate level to start the test';
  const startBtn = locale === 'ar' ? 'ابدأ الاختبار' : locale === 'fr' ? 'Commencer' : 'Start Test';

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#09121E] text-foreground transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="bg-brand-navy pt-24 pb-0 relative overflow-hidden text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <Icon
            icon="solar:clipboard-check-bold"
            className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow"
          />
          <Icon
            icon="solar:clipboard-check-bold"
            className="absolute bottom-20 right-10 text-8xl text-white animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10 py-12">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
            {pageTitle}
          </h1>

          <p className="text-xl text-brand-sky-light max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
            {pageDesc}
          </p>
        </div>
      </section>

      {/* Levels Grid */}
      <section className="py-20 -mt-12 relative z-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {levels.map((level, idx) => (
              <Link
                key={idx}
                href={level.href}
                locale={locale}
                className="group relative flex flex-col p-8 bg-white dark:bg-[#112240] rounded-[2.5rem] shadow-soft hover:-translate-y-2 hover:shadow-soft-lg transition-all duration-300 overflow-hidden border border-transparent hover:border-brand-sky/20"
              >
                {/* DECORATIVE BLOB */}
                <div 
                  className={`
                    absolute w-40 h-40 rounded-full opacity-10 ${level.blobColor} 
                    group-hover:scale-150 transition-transform duration-500
                    -bottom-10 
                    ${isRTL ? '-left-10' : '-right-10'}
                  `}
                ></div>

                <div className={`w-20 h-20 rounded-3xl ${level.color} flex items-center justify-center shrink-0 shadow-lg relative z-10 mb-6`}>
                   <Icon icon={level.icon} className="text-4xl text-white" />
                </div>

                <div className="relative z-10 flex-grow flex flex-col justify-between">
                   <div>
                     <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-3">{level.title}</h3>
                     <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-6">{level.desc}</p>
                   </div>
                   
                   <div className={`flex items-center gap-2 font-bold text-sm uppercase tracking-wider ${level.textColor} group-hover:gap-3 transition-all`}>
                      <span>{startBtn}</span>
                      <Icon icon="solar:arrow-right-linear" className={isRTL ? "rotate-180" : ""} />
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
