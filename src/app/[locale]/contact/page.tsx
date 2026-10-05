import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/app/components/Contact/Form';
import { Icon } from '@iconify/react/dist/iconify.js';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'nav' });

  return {
    title: t('contact'),
    description: `Get in touch with Casp Education to learn more about our Arabic curriculum and educational services.`,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        'ar': '/ar/contact',
        'fr': '/fr/contact',
        'en': '/en/contact',
      },
    },
    openGraph: {
      title: `${t('contact')} | Casp Education`,
      description: 'Get in touch with Casp Education for any inquiries or support.',
      url: `https://centerarabic.com/${locale}/contact`,
      siteName: 'Casp Education',
      images: [
        {
          url: '/logo.png',
          width: 800,
          height: 600,
          alt: 'Casp Education',
        },
      ],
      locale: locale === 'ar' ? 'ar_AR' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('contact')} | Casp Education`,
      description: 'Get in touch with Casp Education for any inquiries or support.',
      images: ['/logo.png'],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'contact' });
  const contactInfo = [
    {
      title: t('phoneTitle'),
      value: '00 1514 900 0895',
      icon: 'solar:phone-calling-bold-duotone',
      color: 'bg-brand-sky/10 text-brand-navy',
      isLtr: true,
    },
    {
      title: t('emailTitle'),
      value: 'contact@centerarabic.com',
      icon: 'solar:letter-bold-duotone',
      color: 'bg-brand-orange/10 text-brand-orange',
    },
    {
      title: t('officeTitle'),
      value: t('officeAddress'),
      icon: 'solar:map-point-bold-duotone',
      color: 'bg-brand-gold/10 text-brand-navy',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-navy pt-24 pb-0 relative overflow-hidden text-center">
        <div className="absolute top-0 start-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-5 bg-brand-sky/5 dark:bg-brand-navy-dark transition-colors duration-300">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] shadow-soft dark:shadow-none border border-brand-sky/20 dark:border-white/10 text-center group hover:-translate-y-2 transition-all duration-500">
                <div className={`w-16 h-16 rounded-2xl ${info.color.replace('bg-', 'bg-').replace('text-', 'text-')} dark:bg-white/10 dark:text-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon icon={info.icon} className="text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy/40 dark:text-white/40 uppercase tracking-widest mb-2">
                  {info.title}
                </h3>
                <p 
                  className="text-xl font-bold text-brand-navy dark:text-white"
                  {...(info.isLtr ? { dir: 'ltr' } : {})}
                >
                  {info.value}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}


