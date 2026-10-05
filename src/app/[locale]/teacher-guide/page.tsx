import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Icon } from "@iconify/react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teacherGuide" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}/teacher-guide` },
  };
}

export default async function TeacherGuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "teacherGuide" });
  const isRTL = locale === "ar";

  const guides = [
    {
      id: "garden",
      title: t("garden.title"),
      desc: t("garden.desc"),
      icon: "solar:leaf-bold-duotone",
      href: "/teacher-guide/garden-guide",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
      groupHoverText: "group-hover:text-emerald-500",
    },
    {
      id: "wafi",
      title: t("wafi.title"),
      desc: t("wafi.desc"),
      icon: "solar:library-bold-duotone",
      href: "/teacher-guide/wafi-guide",
      color:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      groupHoverText: "group-hover:text-blue-500",
    },
    {
      id: "mufid",
      title: t("mufid.title"),
      desc: t("mufid.desc"),
      icon: "solar:notebook-bold-duotone",
      href: "/teacher-guide/mufid-guide",
      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-400",
      groupHoverText: "group-hover:text-orange-500",
    },
    {
      id: "happy",
      title: t("happy.title"),
      desc: t("happy.desc"),
      icon: "solar:smile-circle-bold-duotone",
      href: "/teacher-guide/happyMuslim-guide",
      color:
        "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400",
      border: "border-sky-200 dark:border-sky-800",
      groupHoverText: "group-hover:text-sky-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#020617]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy-light pt-24 pb-0 text-center rounded-b-[4rem] shadow-soft-lg z-10">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
           <Icon icon="solar:bookmark-circle-bold" className="absolute top-10 left-10 text-9xl text-white animate-pulse-slow" />
           <Icon icon="solar:bookmark-circle-bold" className="absolute bottom-20 right-10 text-8xl text-white animate-pulse-slow" style={{animationDelay: '2s'}} />
        </div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-blue-50/80 max-w-2xl mx-auto leading-relaxed mb-2">
            {t("description")}
          </p>
        </div>
      </section>

      {/* Guides */}
      <section className="py-24 -mt-12 relative z-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                className={`group relative bg-white dark:bg-brand-navy-dark p-6 rounded-[2.5rem] shadow-soft border-2 ${guide.border} hover:-translate-y-2 hover:shadow-soft-hover transition-all duration-300 flex flex-col items-center text-center overflow-hidden`}
              >

                {/* Badge Icon */}
                <div
                className={`w-30 h-30 rounded-full flex items-center justify-center text-7xl shadow-inner-soft ${guide.color} mb-6 relative z-10`}
                >
                  <Icon icon={guide.icon} />
                </div>

                <h3
                  className={`text-xl font-bold text-brand-navy dark:text-white mb-3 ${guide.groupHoverText} transition-colors`}
                >
                  {guide.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-2">
                  {guide.desc}
                </p>

                <div className="mt-auto inline-flex items-center gap-2 font-bold text-sm text-brand-navy dark:text-white group-hover:gap-3 transition-all">
                  <span>{t("explore")}</span>
                  <Icon
                    icon="solar:arrow-right-linear"
                    className={`text-lg ${isRTL ? "rotate-180" : ""}`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}