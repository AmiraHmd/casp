"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import PdfBookGrid from "@/app/components/Store/PdfBookGrid";
import { Icon } from "@iconify/react";

type Tab =
  | "mufid"
  | "garden"
  | "wafi"
  | "shamil"
  | "tarikmunirAr"
  | "hidayaFr"
  | "happymuslimEn";

export default function PrivateBookClient() {
  const [activeTab, setActiveTab] = useState<Tab>("mufid");
  const tLevels = useTranslations("store.levels");
  
  // Series translations
  const tMufid = useTranslations("store.alMufid");
  const tGarden = useTranslations("store.gardenOfArabic");
  const tWafi = useTranslations("store.alWafi");
  const tShamil = useTranslations("store.alShamil");
  const tTareeqAlMuneerAr = useTranslations("store.tareeqAlMuneerAr");
  const tHidayahFr = useTranslations("store.hidayahFr");
  const tHappyMuslim = useTranslations("store.theHappyMuslim");

  // Mufid levels: 1 to 6 + P + R
  const mufidKeys = ["P","R","1","2","3","4","5","6"];
  // Garden levels: 1 to 6 + P + R
  const gardenKeys = ["P","R","1","2","3","4","5","6"];
  // Wafi levels: 1 to 8 + P + R
  const wafiKeys = ["P","R","1","2","3","4","5","6","7","8"];
  // Shamil levels: 1 to 4 + P + R
  const shamilKeys = ["1","2","3","4"];
  // Tarik Munir Arabic: 1 to 8 + P + R
  const tarikmunirArKeys = ["P","R","1","2","3","4","5","6","7","8"];
  // Hidayah French: 1 to 4 + P + R
  const hidayaFrKeys = ["P","R","1","2","3","4"];
  // Happy Muslim English: 1 to 6 + P + R
  const happymuslimEnKeys = ["P","R","1","2","3","4","5","6"];

  const getTitle = (key: string) => {
    if (key === "R") return tLevels("kg");
    if (key === "P") return tLevels("prep");
    return tLevels(key);
  };

  const getLevelId = (key: string) => {
    if (key === "R") return "kg";
    if (key === "P") return "prep";
    return key;
  };

  // Mufid array
  const mufidLevels = mufidKeys.map((key) => ({
    id: getLevelId(key),
    title: getTitle(key),
    bookCover: `/pdfbooks/store-book/mufid-book/mufid-${key}/${key}-1.png`,
    pdfUrl: `/book-office/mufid/${key}.pdf`,
  }));

  // Garden array builder
  const buildGardenLevels = (isExercises: boolean) => {
    const section = isExercises ? "exercices" : "assas";
    return gardenKeys.map((key) => {
      const pdfUrl = isExercises
        ? `/book-office/garden/${section}/${key}.pdf`
        : `/book-office/garden/${section}/${key}.pdf`;
      return {
        id: getLevelId(key),
        title: getTitle(key),
        bookCover: `/pdfbooks/store-book/garden-book/garden-${key}/${section}/cover/${key}.jpg`,
        pdfUrl: pdfUrl,
      };
    });
  };

  const gardenAssas = buildGardenLevels(false);
  const gardenExercices = buildGardenLevels(true);

  // Wafi array builder
  const buildWafiLevels = (isExercises: boolean) => {
    const section = isExercises ? "exercices" : "assas";
    return wafiKeys.map((key) => {
      return {
        id: getLevelId(key),
        title: getTitle(key),
        bookCover: `/pdfbooks/store-book/wafi-book/wafi-${key}/${section}/cover/${key}-1.png`,
        pdfUrl: `/book-office/wafi/${section}/${key}.pdf`,
      };
    });
  };

  const wafiAssas = buildWafiLevels(false);
  const wafiExercices = buildWafiLevels(true);

  // New series data
  const shamilLevels = shamilKeys.map((key) => ({
    id: getLevelId(key),
    title: getTitle(key),
    bookCover: `/pdfbooks/store-book/shamil-book/shamil-${key}/${key}.jpg`,
    pdfUrl: `/book-office/shamil/${key}.pdf`,
  }));

  const tarikmunirArLevels = tarikmunirArKeys.map((key) => {
    const assetKey = key === "P" ? "p" : key;
    return {
      id: getLevelId(key),
      title: getTitle(key),
      bookCover: `/pdfbooks/store-book/tarikmunirAr-book/tarikmunirAr-${key}/1-${assetKey}.jpg`,
      pdfUrl: `/book-office/tarikmunirAr/${key}.pdf`,
    };
  });

  const hidayaFrLevels = hidayaFrKeys.map((key) => ({
    id: getLevelId(key),
    title: getTitle(key),
    bookCover: `/pdfbooks/store-book/hidayaFr-book/hidayaFr-${key}/${key}-1.png`,
    pdfUrl: `/book-office/hidayaFr/${key}.pdf`,
  }));

  const happymuslimEnLevels = happymuslimEnKeys.map((key) => ({
    id: getLevelId(key),
    title: getTitle(key),
    bookCover: `/pdfbooks/store-book/happymuslimEn-book/happymuslimEn-${key}/cover/${key}-1.png`,
    pdfUrl: `/book-office/happymuslimEn/${key}.pdf`,
  }));

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12 px-4">
        {[
          { id: "mufid", label: tMufid("title"), icon: "solar:star-fall-bold" },
          {
            id: "garden",
            label: tGarden("title"),
            icon: "solar:leaf-bold",
          },
          {
            id: "wafi",
            label: tWafi("title"),
            icon: "solar:verified-check-bold",
          },
          { id: "shamil", label: tShamil("title"), icon: "solar:library-bold" },
          {
            id: "tarikmunirAr",
            label: tTareeqAlMuneerAr("title"),
            icon: "solar:pen-bold",
          },
          {
            id: "hidayaFr",
            label: tHidayahFr("title"),
            icon: "solar:moon-bold",
          },
          {
            id: "happymuslimEn",
            label: tHappyMuslim("title"),
            icon: "solar:smile-circle-bold",
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
              activeTab === tab.id
                ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-105"
                : "bg-white dark:bg-brand-navy-dark text-gray-500 hover:bg-gray-50 dark:hover:bg-brand-navy border-2 border-transparent hover:border-gray-200 dark:hover:border-white/10"
            }`}
          >
            <Icon icon={tab.icon} className="text-xl" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="w-full">
        {activeTab === "mufid" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-2 px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
                {tMufid("title")}
              </h2>
              <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
            </div>
            <PdfBookGrid levels={mufidLevels} watermark={true} usePopup={true} />
          </div>
        )}

        {activeTab === "garden" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
            <div>
              <div className="text-center mb-2 px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
                  {tGarden("title")}
                </h2>
                <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
              </div>
              <PdfBookGrid levels={gardenAssas} watermark={true} usePopup={true} />
            </div>

            <div>
              <div className="text-center mb-2 px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
                  {tGarden("exercisesTitle")}
                </h2>
                <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
              </div>
              <PdfBookGrid levels={gardenExercices} watermark={true} usePopup={true} />
            </div>
          </div>
        )}

        {activeTab === "wafi" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-16">
            <div>
              <div className="text-center mb-2 px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
                  {tWafi("title")}
                </h2>
                <div className="h-1 w-24 bg-brand-sky mx-auto rounded-full"></div>
              </div>
              <PdfBookGrid levels={wafiAssas} watermark={true} usePopup={true} />
            </div>

            <div>
              <div className="text-center mb-2 px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
                  {tWafi("exercises")}
                </h2>
                <div className="h-1 w-24 bg-brand-sky mx-auto rounded-full"></div>
              </div>
              <PdfBookGrid levels={wafiExercices} watermark={true} usePopup={true} />
            </div>
          </div>
        )}

        {activeTab === "shamil" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-2 px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
                {tShamil("title")}
              </h2>
              <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
            </div>
            <PdfBookGrid levels={shamilLevels} watermark={true} usePopup={true} />
          </div>
        )}

        {activeTab === "tarikmunirAr" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-2 px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
                {tTareeqAlMuneerAr("title")}
              </h2>
              <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
            </div>
            <PdfBookGrid levels={tarikmunirArLevels} watermark={true} usePopup={true} />
          </div>
        )}

        {activeTab === "hidayaFr" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-2 px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
                {tHidayahFr("title")}
              </h2>
              <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
            </div>
            <PdfBookGrid levels={hidayaFrLevels} watermark={true} usePopup={true} />
          </div>
        )}

        {activeTab === "happymuslimEn" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-2 px-4">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4">
                {tHappyMuslim("title")}
              </h2>
              <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full"></div>
            </div>
            <PdfBookGrid levels={happymuslimEnLevels} watermark={true} usePopup={true} />
          </div>
        )}
      </div>
    </div>
  );
}
