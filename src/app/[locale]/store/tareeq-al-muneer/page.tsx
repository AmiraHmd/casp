import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Icon } from "@iconify/react";

export const revalidate = 86400; // 24 hours
import PdfBookGrid from "@/app/components/Store/PdfBookGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "store.tareeqAlMuneerAr",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/store/tareeq-al-muneer`,
      languages: {
        ar: "/ar/store/tareeq-al-muneer",
        fr: "/fr/store/tareeq-al-muneer",
        en: "/en/store/tareeq-al-muneer",
      },
    },
  };
}

export default async function TareeqAlMuneerArPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "store.tareeqAlMuneerAr",
  });
  const tLevels = await getTranslations({ locale, namespace: "store.levels" });

  // --- The Milestones (Levels) ---
  const levelKeys = ["R", "P", "1", "2", "3", "4", "5", "6"];
  const levels = levelKeys.map((key) => {
  const id = key;
  const assetKey = key === "P" ? "p" : key;

    return {
      bookId: `tareeq-ar-${key}`,
      id,
      title: tLevels(key),
      color: "bg-amber-50 text-amber-500",
      border: "border-amber-300",
      bookCover: `/pdfbooks/store-book/tarikmunirAr-book/tarikmunirAr-${key}/1-${assetKey}.jpg`,
      pdfUrl: `/api/books/store-book/tarikmunirAr-book/tarikmunirAr-${key}/1-${assetKey}.pdf`,
    };

  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ================= HERO SECTION (Illuminated) ================= */}
      <section className="relative overflow-hidden bg-brand-gold-light pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        {/* Background Light Effects & Icons */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Central Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/20 blur-[120px] rounded-full mix-blend-overlay"></div>
          {/* Ray Patterns & Icons */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 blur-[80px] rounded-full animate-pulse-slow"></div>
          <div
            className="absolute bottom-10 left-10 w-64 h-64 bg-white/10 blur-[80px] rounded-full animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          ></div>
          <Icon
            icon="solar:map-point-bold"
            className="absolute top-10 right-10 text-9xl text-white animate-pulse-slow"
          />
          <Icon
            icon="solar:compass-bold"
            className="absolute bottom-20 left-10 text-8xl text-white animate-bounce-slow"
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t("title")}
          </h1>

          <p className="text-xl text-brand-gold-dark/90 max-w-2xl mx-auto leading-relaxed mb-2 font-medium">
            {t('description')}
          </p>
          
        </div>
      </section>

      <PdfBookGrid levels={levels} />
    </main>
  );
}
