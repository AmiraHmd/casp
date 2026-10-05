"use client";

import { useEffect, useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { logout } from "@/actions/auth";
import Link from "next/link";
import PremiumButton from "@/app/components/UI/PremiumButton";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface User {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  role: string;
}

export function AuthStatus({ user }: { user: User | null }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const tAuth = useTranslations("auth");

  useEffect(() => {
    if (user) {
      const isAdminPath = pathname.includes("/admin");
      if (user.role !== "ADMIN" && isAdminPath) {
        router.push("/");
      }
    }
  }, [user, pathname, router]);

  if (user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-3 p-1.5 pe-4 rounded-full bg-brand-sky/10 dark:bg-white/5 hover:bg-brand-sky/20 transition-all border border-brand-sky/20 dark:border-white/10"
        >
          <div className="w-9 h-9 bg-linear-to-br from-brand-sky to-brand-navy dark:from-brand-gold dark:to-brand-orange text-white rounded-full flex items-center justify-center font-bold shadow-soft-sm">
            {user.firstName?.charAt(0).toUpperCase() ||
              user.name?.charAt(0).toUpperCase() ||
              "?"}
          </div>
          <span className="text-sm font-semibold text-brand-navy dark:text-white hidden sm:inline-block">
            {user.firstName || user.name}
          </span>
          <Icon
            icon="lucide:chevron-down"
            className={`text-brand-navy dark:text-white transition-transform ${showMenu ? "rotate-180" : ""}`}
          />
        </button>

        {showMenu && (
        <div className="absolute mt-3 w-56 ltr:right-0 rtl:left-0 bg-white dark:bg-brand-navy-dark rounded-2xl shadow-soft-lg py-2 border border-brand-sky/20 dark:border-white/10 z-50 backdrop-blur-xl">
            <div className="px-4 py-3 border-b border-brand-sky/10 dark:border-white/5 mb-2">
              <p className="text-xs text-gray-400 font-medium">
                {tAuth("signedInAs")}
              </p>
              <p className="text-sm font-bold text-brand-navy dark:text-white truncate">
                {user.firstName || user.name}
              </p>
            </div>

            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-navy dark:text-white hover:bg-brand-sky/10 dark:hover:bg-white/5 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Icon icon="lucide:layout-dashboard" />
                {tAuth("adminDashboard")}
              </Link>
            )}

            <button
              onClick={() => logout()}
              className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <Icon icon="lucide:log-out" />
              {tAuth("signOut")}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <PremiumButton
          variant="primary"
          size="sm"
          onClick={() => setShowLogin(true)}
        >
          {tAuth("signInButton")}
        </PremiumButton>

        {/* <PremiumButton
          variant="primary"
          size="sm"
          onClick={() => setShowRegister(true)}
        >
          {tAuth('signUpButton')}
        </PremiumButton> */}
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}
