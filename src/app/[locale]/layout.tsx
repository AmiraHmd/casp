import { Cairo } from "next/font/google";
import "../globals.css";
import Header from "@/app/components/Layout/Header";
import Footer from "@/app/components/Layout/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";
import Aoscompo from "@/utils/aos";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { isRTL, type Locale } from "@/i18n/config";
import { ThemeProvider } from "@/app/components/Theme/ThemeProvider";
import { CartProvider } from "@/app/context/cart.context";
import { getSession } from "@/lib/auth";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { verifyPdfAccessToken } from "@/lib/token";

// Cairo font for Arabic-first design
const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | CaspEducation',
    default: 'CaspEducation | Number 1 Arabic Learning Center & Online Platform',
  },
  description: 'CaspEducation is the leading Arabic learning center and educational platform. Discover high-quality courses, books, and resources tailored for success at caspeducation. Join us today!',
  keywords: ['caspeducation', 'casp education', 'centerarabic', 'casp', 'casp arabic center', 'Arabic', 'Education', 'Learning', 'Books', 'E-books', 'Curriculum', 'Online Courses'],
  metadataBase: new URL('https://centerarabic.com'),
  alternates: {
    canonical: 'https://centerarabic.com',
    languages: {
      'ar': 'https://centerarabic.com/ar',
      'en': 'https://centerarabic.com/en',
      'fr': 'https://centerarabic.com/fr',
      'x-default': 'https://centerarabic.com/ar',
    },
  },
  openGraph: {
    title: 'Casp Education | Comprehensive Arabic Learning Platform',
    description: 'Casp Education is an online learning platform offering high-quality Arabic education, professional courses, and tailored curriculums. Start your journey with Center Arabic today.',
    url: 'https://centerarabic.com',
    siteName: 'Casp Education',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Casp Education Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casp Education',
    description: 'Casp Education is an online learning platform offering high-quality Arabic education and professional courses.',
    images: ['/logo.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Casp Education',
  alternateName: ['Casp Arabic Center', 'caspeducation', 'casp education', 'Center Arabic'],
  description: 'Online learning platform offering high-quality Arabic education and professional courses.',
  url: 'https://centerarabic.com',
  logo: 'https://centerarabic.com/logo.png',
  sameAs: [
    'https://www.facebook.com/caspeducation',
    'https://www.instagram.com/caspeducation',
    'https://twitter.com/caspeducation',
    'https://www.linkedin.com/company/caspeducation'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@centerarabic.com',
    availableLanguage: ['Arabic', 'English', 'French']
  }
};

export default async function PagesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const session = await getSession();
  const { locale } = await params;

  const cookieStore = await cookies();
  const bookSession = cookieStore.get('book_session')?.value;
  let hasBookSession = false;
  
  if (bookSession) {
    try {
      verifyPdfAccessToken(bookSession);
      hasBookSession = true;
    } catch {
      hasBookSession = false;
    }
  }

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={isRTL(locale as Locale) ? "rtl" : "ltr"}
      key={locale}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://pub-2e481fdf58914ed08e036eeb987a1a89.r2.dev" />
        <link rel="preconnect" href="https://3nvnebfanoina0ww.public.blob.vercel-storage.com" />
      </head>
      <body
        className={`${cairo.variable} font-sans min-h-screen relative overflow-x-hidden bg-brand-sky/5 text-brand-navy dark:bg-brand-navy-black dark:text-white selection:bg-brand-gold selection:text-brand-navy transition-colors duration-300`}
      >
        {/* Global Background Layers - Dark Mode */}
        <div className="fixed inset-0 z-0 pointer-events-none user-select-none opacity-0 dark:opacity-100 transition-opacity duration-500">
          {/* 1. Deep navy radial gradient (center-right to edges) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,#0A1A2F_0%,#050E1A_60%,#02060C_100%)]" />

          {/* 2. Arabic Letters Pattern Overlay - symbolizing learning */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.letter%7Bfont-family:sans-serif;font-weight:bold;fill:%23ffffff;%7D%3C/style%3E%3Cg%3E%3Ctext x='20' y='40' class='letter' font-size='24'%3Eأ%3C/text%3E%3Ctext x='120' y='30' class='letter' font-size='26'%3Eب%3C/text%3E%3Ctext x='60' y='90' class='letter' font-size='22'%3Eت%3C/text%3E%3Ctext x='140' y='140' class='letter' font-size='28'%3Eج%3C/text%3E%3Ctext x='30' y='160' class='letter' font-size='24'%3Eد%3C/text%3E%3Ctext x='110' y='100' class='letter' font-size='20'%3Eض%3C/text%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
            }}
          />

          {/* 3. Subtle Large Arabic Calligraphy Watermark (Decorative) */}
          <div
            className="absolute top-[-10%] start-[-5%] w-[800px] h-[800px] opacity-[0.03] rotate-12 bg-no-repeat bg-contain pointer-events-none hidden lg:block"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23D4AF37' d='M45.5,-76.3C58.9,-69.3,69.8,-57.1,75.9,-44.2C82,-31.3,83.3,-17.7,81.8,-4.6C80.3,8.5,76,21.1,69.5,33.4C63,45.7,54.3,57.7,43.2,66.1C32.1,74.5,18.6,79.3,5.9,78.2C-6.8,77.1,-18.7,70.1,-31.3,63.1C-43.9,56.1,-57.2,49.1,-67.2,38.6C-77.2,28.1,-83.9,14.1,-82.9,0.5C-81.9,-13,-73.2,-26,-63.5,-37.2C-53.8,-48.4,-43.1,-57.8,-31.4,-65.8C-19.7,-73.8,-7,-80.4,7.2,-82.9C21.4,-85.4,32.1,-83.3,45.5,-76.3Z' transform='translate(100 100)' /%3E%3C/svg%3E")`,
            }}
          />

          {/* 4. Ambient Gold Glow */}
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full mix-blend-screen opacity-20 transform translate-x-1/2 rtl:-translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Global Background Layers - Light Mode */}
        <div className="fixed inset-0 z-0 pointer-events-none user-select-none dark:opacity-0 transition-opacity duration-500">
          {/* Soft Gray/White Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-brand-sky/5 to-white" />

          {/* Subtle Blue/Gold Accents for Light Mode */}
          <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-brand-orange/5 blur-[100px] rounded-full mix-blend-multiply opacity-40"></div>
          <div className="absolute bottom-0 start-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full mix-blend-multiply opacity-30"></div>

          {/* Arabic Letters Pattern - Darker for Light Mode */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.letter%7Bfont-family:sans-serif;font-weight:bold;fill:%23000000;%7D%3C/style%3E%3Cg%3E%3Ctext x='20' y='40' class='letter' font-size='24'%3Eأ%3C/text%3E%3Ctext x='120' y='30' class='letter' font-size='26'%3Eب%3C/text%3E%3Ctext x='60' y='90' class='letter' font-size='22'%3Eت%3C/text%3E%3Ctext x='140' y='140' class='letter' font-size='28'%3Eج%3C/text%3E%3Ctext x='30' y='160' class='letter' font-size='24'%3Eد%3C/text%3E%3Ctext x='110' y='100' class='letter' font-size='20'%3Eض%3C/text%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
            }}
          />
        </div>

        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <CartProvider>
              <Aoscompo>
                <div className="relative z-10 flex flex-col min-h-screen">
                  <Header user={session?.user || null} hasBookSession={hasBookSession} />
                  <main className="grow">{children}</main>
                  <Footer />
                </div>
              </Aoscompo>
              <ScrollToTop />
              <Toaster position="top-center" reverseOrder={false} />
            </CartProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

