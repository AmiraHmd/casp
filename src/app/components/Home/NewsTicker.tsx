"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Icon } from "@iconify/react";

const NewsTicker = () => {
  const t = useTranslations("home.newsTicker");
  const locale = useLocale();
  const isRTL = locale === "ar";
  
  // Get items from translations
  // Since we might have a variable number of items, we'll try to get them by index.
  const newsItems = React.useMemo(() => [
    t("item1"),
    t("item2"),
    t("item3"),
  ].filter(item => item && item !== "item1" && item !== "item2" && item !== "item3" && !item.includes("home.newsTicker")), [t]);

  // Default items if translations are missing or during first load
  const displayItems = React.useMemo(() => newsItems.length > 0 ? newsItems : [
    isRTL ? "مرحباً بكم في منصة كاسب التعليمية" : "Welcome to Casp Educational Platform",
    isRTL ? "اكتشف مجموعتنا الجديدة من الموارد التعليمية" : "Discover our new range of educational resources",
    isRTL ? "خصومات حصرية لفترة محدودة على جميع الكتب" : "Limited time exclusive discounts on all books"
  ], [newsItems, isRTL]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const controls = useAnimationControls();

  useEffect(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.firstChild as HTMLElement;
      if (firstChild) {
        setContentWidth(firstChild.parentElement?.scrollWidth || 0);
      }
    }
  }, [displayItems, locale]);

  useEffect(() => {
    if (contentWidth > 0) {
      const actualContentWidth = contentWidth / 2; // Because we duplicate the items
      const duration = actualContentWidth / 50; 
      
      controls.start({
        x: isRTL ? [actualContentWidth, 0] : [0, -actualContentWidth],
        transition: {
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [contentWidth, controls, isRTL]);

  return (
    <div className="relative py-2.5 overflow-hidden bg-brand-navy dark:bg-brand-navy-dark border-y border-white/10 shadow-lg z-10">
      <div className="w-full px-4 sm:px-6 lg:px-6 flex items-center">
        {/* Label */}
        <div className="shrink-0 z-10 bg-brand-orange text-white px-4 py-1 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 ltr:mr-4 rtl:ml-4">
          <Icon icon="solar:bell-bing-bold-duotone" width={18} height={18} className="animate-pulse" />
          <span className="whitespace-nowrap">{t("label")}</span>
        </div>

        {/* Ticker Container */}
        <div 
          className="relative grow overflow-hidden h-6"
        >
          <motion.div
            ref={containerRef}
            animate={controls}
            className="flex whitespace-nowrap gap-12 absolute top-0"
            style={{ width: "max-content" }}
          >
            {[...displayItems, ...displayItems].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 text-white/90 font-medium hover:text-brand-gold transition-colors cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-brand-gold shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Accents */}
      <div className="absolute inset-0 bg-linear-to-r from-brand-navy via-transparent ltr:to-brand-navy rtl:to-brand-navy pointer-events-none opacity-40" />
    </div>
  );
};

export default NewsTicker;
