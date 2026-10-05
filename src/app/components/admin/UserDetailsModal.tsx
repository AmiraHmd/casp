"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { useTranslations } from "next-intl";

interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone?: string | null;
  country?: string | null;
  createdAt: Date | string;
  accessCodes?: {
    code: string | null;
    used: boolean;
    expiresAt: Date | string | null;
  }[];
}

interface UserDetailsModalProps {
  user: AdminUser;
  onClose: () => void;
}

export function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  const [mounted, setMounted] = useState(false);
  const tAdmin = useTranslations("admin");
  const tAuth = useTranslations("auth");

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      setMounted(false);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          <Icon icon="solar:close-circle-bold" width={28} />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-brand-navy dark:bg-white text-white dark:text-brand-navy flex items-center justify-center text-3xl font-bold mb-4 shadow-lg">
            {user.firstName.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-brand-navy dark:text-white">
            {user.firstName} {user.lastName}
          </h2>
          <span
            className={`mt-2 px-3 py-1 rounded-full text-xs font-bold border ${
              user.role === "ADMIN"
                ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
            }`}
          >
            {user.role}
          </span>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {tAuth("emailLabel")}
              </p>
              <div className="flex items-center gap-2 text-slate-700 dark:text-white font-medium">
                <Icon
                  icon="solar:letter-bold-duotone"
                  className="text-brand-navy dark:text-brand-sky"
                />
                {user.email}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {tAuth("phoneLabel")}
              </p>
              <div className="flex items-center gap-2 text-slate-700 dark:text-white font-medium">
                <Icon
                  icon="solar:phone-bold-duotone"
                  className="text-brand-navy dark:text-brand-sky"
                />
                {user.phone || "---"}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {tAuth("countryLabel")}
              </p>
              <div className="flex items-center gap-2 text-slate-700 dark:text-white font-medium">
                <Icon
                  icon="solar:global-bold-duotone"
                  className="text-brand-navy dark:text-brand-sky"
                />
                {user.country || "---"}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {tAdmin("created")}
              </p>
              <div className="flex items-center gap-2 text-slate-700 dark:text-white font-medium">
                <Icon
                  icon="solar:calendar-bold-duotone"
                  className="text-brand-navy dark:text-brand-sky"
                />
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              {tAdmin("accessCode")}
            </p>
            <div className="flex flex-wrap gap-2">
              {user.accessCodes && user.accessCodes.length > 0 ? (
                user.accessCodes.map((code, index) => (
                  <div
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2"
                  >
                    <Icon
                      icon="solar:key-bold-duotone"
                      className="text-brand-gold"
                    />
                    <span className="font-mono text-sm dark:text-white">
                      {code.code}
                    </span>
                    {code.used && (
                      <span className="w-2 h-2 rounded-full bg-green-500" title="Used" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                  No access codes assigned
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {tAdmin("close")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
