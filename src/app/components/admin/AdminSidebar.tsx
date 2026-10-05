"use client";

import { Link, usePathname } from "@/i18n/routing";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const menuItems = [
  { icon: "solar:widget-2-bold-duotone", label: "Dashboard", href: "/admin" },
  {
    icon: "solar:users-group-rounded-bold-duotone",
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: "solar:key-square-bold-duotone",
    label: "Access Codes",
    href: "/admin/codes",
  },
  {
    icon: "solar:book-bookmark-bold-duotone",
    label: "Riyada Codes",
    href: "/admin/riyada-codes",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const t = useTranslations("admin");

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 100 : 280 }}
      className="hidden lg:flex h-screen sticky top-0 z-40 bg-white dark:bg-slate-800 border-e border-slate-200 dark:border-slate-700 flex-col"
    >
      {/* Header */}
      <div
        className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} p-6 mb-2`}
      >
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-navy dark:bg-white flex items-center justify-center shadow-md">
              <Icon
                icon="solar:shield-star-bold"
                className="text-white dark:text-brand-navy text-xl"
              />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-slate-800 dark:text-white leading-none">
                {t("dashboard")}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Casp Education
              </p>
            </div>
          </motion.div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
        >
          <Icon
            icon={
              isCollapsed
                ? "solar:sidebar-minimalistic-broken"
                : "solar:minimize-square-3-broken"
            }
            width={24}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                            relative flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group
                            ${
                              isActive
                                ? "bg-brand-navy text-white shadow-md shadow-brand-navy/20 dark:bg-white dark:text-brand-navy"
                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            }
                            ${isCollapsed ? "justify-center" : ""}
                        `}
            >
              <Icon
                icon={item.icon}
                width={24}
                className={`transition-colors ${isActive ? "text-brand-gold" : "group-hover:text-slate-900 dark:group-hover:text-white"}`}
              />

              {!isCollapsed && (
                <span className="font-semibold tracking-wide text-sm">
                  {item.label === "Dashboard" && t("dashboard")}
                  {item.label === "Users" && t("users")}
                  {item.label === "Access Codes" && t("accessCodes")}
                  {item.label === "Riyada Codes" && "Riyada Codes"}
                </span>
              )}


              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="activeInd"
                  className="absolute inset-inline-end-3 w-1.5 h-1.5 rounded-full bg-brand-gold"
                />
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute inset-inline-start-full ms-4 px-3 py-1.5 bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label === "Dashboard" && t("dashboard")}
                  {item.label === "Users" && t("users")}
                  {item.label === "Access Codes" && t("accessCodes")}
                  {item.label === "Riyada Codes" && "Riyada Codes"}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-700 mx-4">
        <Link
          href="/"
          className={`
                    flex items-center gap-4 p-3 rounded-xl transition-all duration-200
                    text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10
                    ${isCollapsed ? "justify-center" : ""}
                `}
        >
          <Icon icon="solar:logout-2-bold-duotone" width={24} />
          {!isCollapsed && (
            <span className="font-bold text-sm">{t("exitAdmin")}</span>
          )}
        </Link>
      </div>
    </motion.aside>
  );
}
