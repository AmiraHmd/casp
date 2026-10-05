"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="
        relative flex items-center justify-center
        w-10 h-10 rounded-full
        bg-white/5 border border-white/10
        backdrop-blur-md
        transition-all duration-300 ease-out
        hover:bg-white/10
        hover:scale-110
        hover:shadow-[0_0_18px_rgba(255,215,0,0.35)]
        active:scale-95
        focus:outline-none
        focus:ring-2
        focus:ring-brand-gold
        overflow-hidden cursor-pointer
      "
    >
      {/* Subtle radial hover glow */}
      <span
        className="
          pointer-events-none absolute inset-0 rounded-full
          opacity-0 hover:opacity-100
          transition-opacity duration-300
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_70%)]
        "
      />

      {/* Moon */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
        }}
        whileHover={{
          rotate: 15,
          scale: 1.15,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute"
      >
        <Icon
          icon="solar:moon-stars-bold-duotone"
          className="text-xl text-brand-gold"
        />
      </motion.div>

      {/* Sun */}
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
          rotate: isDark ? -90 : 0,
        }}
        whileHover={{
          rotate: -15,
          scale: 1.15,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute"
      >
        <Icon
          icon="solar:sun-2-bold-duotone"
          className="text-xl text-amber-500"
        />
      </motion.div>
    </button>
  );
}