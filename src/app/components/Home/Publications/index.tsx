"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";

const FloatingOrb = ({ icon, label, delay }: { icon: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="absolute -top-4 -end-4 z-30"
  >
    <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand-orange text-white flex flex-col items-center justify-center shadow-lg border-2 border-white/50">
      <Icon icon={icon} className="text-xl md:text-5xl mb-0.5 drop-shadow-md" />
      <span className="text-[7px] md:text-[8px] font-black uppercase tracking-tighter opacity-90">
         {label}
      </span>
    </div>
  </motion.div>
);

interface PublicationItem {
  id: string;
  theme: string;
  image: string;
  badgeIcon: string;
  badgeLabel?: string;
}

const TiltCard = ({ item, tPub, index }: { item: PublicationItem; tPub: (key: string) => string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group w-full"
    >
      {/* Category Badge */}
      <FloatingOrb icon={item.badgeIcon} label={item.badgeLabel || ""} delay={0.5 + (index * 0.1)} />

      <div className="flex flex-col gap-6">
        {/* Image Card */}
        <div className={`relative aspect-square w-full bg-linear-to-br ${item.theme} rounded-3xl md:rounded-[2.5rem] p-1 border border-white/20 shadow-xl transition-all duration-500 overflow-hidden flex items-center justify-center group-hover:shadow-2xl group-hover:scale-105`}>
          <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden">
            <Image
              src={item.image}
              alt={tPub(item.id)}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-110"
              priority
              quality={100}
            />
          </div>
        </div>

        {/* Title (Below) */}
        <div className="text-center px-2">
          <h3 className="text-xl md:text-2xl font-black text-brand-navy dark:text-white leading-tight transition-colors group-hover:text-brand-orange">
            {tPub(item.id)}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

const Publications = () => {
  const t = useTranslations("home");
  const tPub = useTranslations("publications");

  const items = [
    {
      id: "happyMuslim",
      theme: "from-purple-600 via-purple-500 to-indigo-600",
      image: "/images/ourbooks/The Happy Muslim Series.png",
      badgeIcon: "solar:star-bold"
      // badgeLabel: "Featured"
    },
    {
      id: "illuminatingPath",
      theme: "from-brand-orange via-orange-500 to-amber-500",
      image: "/images/ourbooks/Illuminating Path Series.png",
      badgeIcon: "solar:medal-star-bold-duotone"
      // badgeLabel: "Premium"
    },
    {
      id: "arabicShamel",
      theme: "from-teal-600 via-teal-500 to-emerald-600",
      image: "/images/ourbooks/Arabic Shamel Series.png",
      badgeIcon: "solar:book-bold"
      // badgeLabel: "Education"
    },
    {
      id: "arabicGarden",
      theme: "from-red-800 via-red-600 to-rose-700",
      image: "/images/ourbooks/Arabic Garden Series.png",
      badgeIcon: "solar:library-bold-duotone"
      // badgeLabel: "Institution"
    },
  ];

  return (
    <section id="publications" className="relative py-24 md:py-40 bg-[#F0F9FF] dark:bg-brand-navy-dark overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 start-0 w-[500px] h-[500px] bg-brand-sky/10 rounded-full blur-[100px]" />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Header Section (Editorial Style) */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 mb-6"
          >
            <span className="text-brand-orange font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
              {t("publicationsLabel") || "OUR PUBLICATIONS"}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-brand-navy dark:text-white mb-6 tracking-tight leading-tight"
          >
            {t("publications")}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-navy/60 dark:text-white/60 text-base md:text-lg max-w-2xl mx-auto font-medium"
          >
            {t("publicationsSubtitle") || "نقدم لكم مجموعات تعليمية متميزة مصممة بعناية لتلبية احتياجات المتعلمين في مختلف المراحل"}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-10">
          {items.map((item, index) => (
            <TiltCard 
              key={item.id} 
              item={item} 
              tPub={tPub} 
              //tLearnMore={t("learnMore")} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
