"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Partner {
  id: string;
  logo: string;
  isFeatured?: boolean;
}

const Partners = () => {
  const t = useTranslations("home");
  const tPartners = useTranslations("partners");

  const partners: Partner[] = [
    { id: "maktabatouna", isFeatured: true, logo: "/images/ourCompany/Sarl Maktabatouna.png" },
    { id: "sindbad", logo: "/images/ourCompany/Sindbadglobal.png" },
    { id: "darManabe", logo: "/images/ourCompany/Dar Manabe Alnour.png" },
    { id: "averroes", logo: "/images/ourCompany/AVERROES Bookshop.png" },
    { id: "darAlKutub", logo: "/images/ourCompany/Dar Al-Kutub.png" },
    { id: "ta3liem", logo: "/images/ourCompany/Ta3liem Distribution.png" },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-linear-to-b from-white via-brand-sky/10 to-white dark:from-brand-navy-dark dark:via-brand-navy/20 dark:to-brand-navy-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 start-1/4 w-[500px] h-[500px] bg-brand-sky/20 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 end-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
            {t("partners")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy dark:text-white mb-6 tracking-tight">
            {t("partnersTitle")}
          </h2>
          <p className="text-xl text-brand-navy/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t("partnersSubtitle")}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {partners.map((partner) => {
            const name = tPartners(`${partner.id}.name`);
            const address = tPartners(`${partner.id}.address`);
            const website = tPartners(`${partner.id}.website`);
            const email = tPartners(`${partner.id}.email`);
            const phone = tPartners(`${partner.id}.phone`);
            const phone2 = tPartners(`${partner.id}.phone2`);

            return (
              <motion.div key={partner.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }} className="group relative h-full">
                {/* Card */}
                <div className="relative h-full flex flex-col p-8 rounded-[2.5rem] border border-brand-sky/20 dark:border-white/10 bg-white/80 dark:bg-brand-navy-dark shadow-soft backdrop-blur-md text-center items-center transition-all duration-500 hover:border-brand-orange hover:shadow-2xl hover:shadow-brand-orange/20 hover:-translate-y-2 hover:scale-[1.02]">
                  {/* Logo + Featured Badge */}
                  <div className="relative mb-8 w-full flex justify-center">
                    <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center p-3 transition-all duration-500 shadow-lg bg-white dark:bg-white/10 border border-brand-sky/20 group-hover:border-2 group-hover:border-brand-orange group-hover:scale-110 group-hover:shadow-brand-orange/30">
                      <Image
                        src={partner.logo}
                        alt={name}
                        width={80}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* Only the badge is special */}
                    {partner.isFeatured && (
                      <div className="absolute -top-2 end-1/4 bg-brand-gold text-brand-navy text-[10px] font-black uppercase px-2 py-1 rounded-lg shadow-sm z-10">
                        {t("featuredPartner")}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="grow w-full">
                    <h3 className="text-2xl font-black mb-6 text-brand-navy dark:text-white transition-colors group-hover:text-brand-orange">
                      {name}
                    </h3>

                    <div className="space-y-4 text-start">
                      {address && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-brand-sky/5 flex items-center justify-center shrink-0">
                            <Icon icon="solar:map-point-bold-duotone" className="text-brand-orange text-lg" />
                          </div>
                          <p className="text-sm text-brand-navy/60 dark:text-white/60 leading-relaxed font-medium pt-1">
                            {address}
                          </p>
                        </div>
                      )}

                      <div className="space-y-3">
                        {phone && (
                          <a
                            href={`tel:${phone}`}
                            className="flex items-center gap-3 text-brand-navy/70 dark:text-white/70 hover:text-brand-orange transition-colors group/link w-fit"
                          >
                            <div className="w-8 h-8 rounded-xl bg-brand-sky/5 flex items-center justify-center shrink-0 group-hover/link:bg-brand-orange/10">
                              <Icon icon="solar:phone-bold-duotone" className="text-brand-orange text-lg" />
                            </div>
                            <span className="text-sm font-bold group-hover/link:underline">{phone}</span>
                          </a>
                        )}
                        {phone2 && (
                          <a
                            href={`tel:${phone2}`}
                            className="flex items-center gap-3 text-brand-navy/70 dark:text-white/70 hover:text-brand-orange transition-colors group/link w-fit"
                          >
                            <div className="w-8 h-8 rounded-xl bg-brand-sky/5 flex items-center justify-center shrink-0 group-hover/link:bg-brand-orange/10">
                              <Icon icon="solar:phone-bold-duotone" className="text-brand-orange text-lg" />
                            </div>
                            <span className="text-sm font-bold group-hover/link:underline">{phone2}</span>
                          </a>
                        )}
                      </div>

                      {email && (
                        <a
                          href={`mailto:${email}`}
                          className="flex items-center gap-3 text-brand-navy/70 dark:text-white/70 hover:text-brand-orange transition-colors group/link w-fit"
                        >
                          <div className="w-8 h-8 rounded-xl bg-brand-sky/5 flex items-center justify-center shrink-0 group-hover/link:bg-brand-orange/10">
                            <Icon icon="solar:letter-bold-duotone" className="text-brand-orange text-lg" />
                          </div>
                          <span className="text-sm font-bold truncate max-w-[180px] group-hover/link:underline">
                            {email}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-10 pt-6 border-t border-brand-sky/10 w-full">
                    {website ? (
                      <a
                        href={`https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full py-4 px-4 rounded-2xl font-black text-sm transition-all duration-300 gap-2 bg-brand-navy/5 dark:bg-white/5 text-brand-navy dark:text-white hover:bg-brand-orange hover:text-white hover:shadow-xl hover:shadow-brand-orange/25"
                      >
                        {t("visitWebsite")}
                        <Icon icon="solar:arrow-right-up-bold-duotone" className="text-lg" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 text-brand-navy/30 dark:text-white/30 text-xs font-bold uppercase tracking-widest justify-center italic h-[52px]">
                        Global Distribution
                      </div>
                    )}
                  </div>

                  {/* Glow */}
                  <div className="absolute top-0 end-0 w-32 h-32 bg-brand-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2 blur-3xl group-hover:bg-brand-orange/20 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
