"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import PremiumButton from "@/app/components/UI/PremiumButton";
const Banner = () => {
  const t = useTranslations("home");

  return (
    <section
      id="Home"
      aria-label="Hero section"
      className="relative overflow-hidden pt-10 lg:pt-10 bg-transparent"
    >
      {/* ================= BACKGROUND ELEMENTS ================= */}
      <div className="absolute inset-0 -z-20 pointer-events-none select-none overflow-hidden">
        {/* Main Background Image - Sketch pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-20">
           <Image
            src="/images/logo/bgn.png"
            alt=""
            fill
            quality={60}
            sizes="100vw"
            className="object-contain object-top scale-110"
          />
        </div>

        {/* Gradient Blobs */}
        <div className="absolute top-0 start-0 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[800px] bg-brand-sky/20 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-0 end-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[100px] mix-blend-screen dark:mix-blend-screen" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          {/* ================= TEXT SECTION ================= */}
          <div className="flex flex-col items-center space-y-4 max-w-4xl mx-auto">
            
            {/* Heading */}
            <motion.div 
               className="relative space-y-2"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
            >
              {/* Background Logo behind title */}
              {/* <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[550px] sm:h-[550px] lg:w-[600px] lg:h-[600px] opacity-[0.07] dark:opacity-5 pointer-events-none -z-10">
                <Image
                  src="/images/logo/casp-logo.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div> */}

              <h1 className="text-4xl sm:text-5xl lg:text-[70px] font-extrabold leading-tight sm:leading-tight lg:leading-[1.1] text-[#2c75a4] dark:text-white text-center font-cairo">
                <span className="sr-only">CaspEducation - </span>
                {t('heroTitle')}
              </h1>
              
              <p className="text-sm sm:text-base lg:text-[20px] font-medium leading-relaxed text-brand-navy/80 dark:text-white/80 max-w-2xl mx-auto">
                {t('heroDescription')}
              </p>
            </motion.div>

            {/* Shop Now Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center flex-col items-center w-full"
            >
              <Link href="/store">
                <PremiumButton 
                  variant="primary" 
                  size="lg" 
                  className="text-lg rounded-xl shadow-[0_10px_30px_rgba(251,191,36,0.3)] bg-linear-to-b from-[#ffdb6d] to-[#ffc53d] border-none text-[#5d4a1b]"
                >
                  <Icon icon="solar:cart-large-2-bold" className="text-2xl" />
                  {t('premiumButton1')}
                </PremiumButton>
              </Link>
            </motion.div>
          </div>

          {/* ================= IMAGE & DECORATIONS ================= */}
          <div className="relative w-full max-w-[1900px] mx-auto">
             
             {/* Main Kids Image */}
             <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
               className="relative z-20 flex justify-center"
             >
                <div className="relative w-full aspect-2/1 max-w-[1950px]">
                   <Image 
                     src="/images/hero/child-img.png" 
                     alt="Happy kids learning"
                     fill
                     className="object-contain"
                     priority
                     quality={75}
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                   />
                </div>
             </motion.div>

             {/* Bottom Badge Bar */}
             <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ delay: 0.9, duration: 0.6 }}
               className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-30 w-full max-w-xl"
             >
                <div className="relative aspect-16/3 w-full">
                   <Image 
                     src="/images/hero/discipt-bar.png" 
                     alt="Verified Content & Safe for Kids"
                     fill
                     className="object-contain drop-shadow-xl"
                   />
                </div>
             </motion.div>

             {/* Floating Decorations */}
             {/* Globe */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[30%] end-[1%] sm:end-[2%] w-[400px] h-[100px] sm:w-[120px] sm:h-[120px] z-10 hidden sm:block"
              >
                <Image src="/images/hero/glob.png" alt="" fill className="object-contain" />
              </motion.div>

             {/* Big Graduation Cap */}
              <motion.div
                animate={{
                  y: [10, -10, 10],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-[50%] start-[2%] sm:start-[-2%] w-16 h-16 sm:w-[140px] sm:h-[140px] z-10 hidden sm:block"
              >
                <Image src="/images/hero/big-hat-left.png" alt="" fill className="object-contain" />
              </motion.div>

             {/* Small Graduation Cap */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[30%] start-[1%] sm:start-[5%] w-12 h-12 sm:w-[80px] sm:h-[80px] z-10 hidden sm:block"
              >
                <Image src="/images/hero/small-hat-left.png" alt="" fill className="object-contain" />
              </motion.div>

             {/* Feather - Left */}
              <motion.div
                animate={{
                  y: [10, -10, 10],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-[10%] start-[1%] sm:start-[1%] w-8 h-8 sm:w-[50px] sm:h-[50px] z-10 hidden lg:block opacity-70"
              >
                <Image src="/images/hero/feather-left.png" alt="" fill className="object-contain" />
              </motion.div>

             {/* Feather - Right */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[10%] end-[1%] sm:end-[1%] w-7xl h-7xl sm:w-[60px] sm:h-[60px] z-10 hidden lg:block opacity-80"
              >
                <Image src="/images/hero/feather-right.png" alt="" fill className="object-contain" />
              </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
