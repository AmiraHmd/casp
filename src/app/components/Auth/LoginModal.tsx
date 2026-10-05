"use client";
import { createPortal } from 'react-dom';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/app/components/UI";
import PremiumButton from "@/app/components/UI/PremiumButton";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { login } from "@/actions/auth";
import { Icon } from "@iconify/react";

export function LoginModal({
  onClose,
  onSwitchToRegister,
}: {
  onClose: () => void;
  onSwitchToRegister: () => void;
}) {
  const router = useRouter();
  const tAuth = useTranslations("auth");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = tAuth("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = tAuth("invalidEmail");
    }

    if (!formData.password) {
      newErrors.password = tAuth("passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = tAuth("passwordLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const submitData = new FormData();
    submitData.append("email", formData.email);
    submitData.append("password", formData.password);

    try {
      const res = await login(submitData);

      if (res?.error) {
        const errorMessage = tAuth(res.error);
        setServerError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      } else if (res?.success) {
        toast.success(tAuth("loginSuccess"));
        setLoading(false);
        onClose();
        router.refresh();
      } else {
        // Fallback
        setLoading(false);
        onClose();
        router.refresh();
      }
    } catch (err: unknown) {
      setLoading(false);
      const errorMessage =
        err instanceof Error ? err.message : tAuth("errorGeneric");
      toast.error(errorMessage);
    }
  };

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: undefined });
      }
      if (serverError) {
        setServerError(null);
      }
    };

  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      setMounted(false);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Auto-hide server error after 10 seconds
  React.useEffect(() => {
    if (serverError) {
      const timer = setTimeout(() => {
        setServerError(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [serverError]);

  if (!mounted) return null;

  return createPortal(
    <div 
      id="auth-modal" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white/90 dark:bg-brand-navy/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex justify-center mb-2 mt-0 pt-0">
          <Image
            src="/images/logo/casp-logo.png"
            alt="CASP Logo"
            width={100}
            height={100}
            className="h-20 w-auto object-contain"
            priority
          />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-brand-navy dark:text-white text-center">
          {tAuth("signInButton")}
        </h2>

        {serverError && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 animate-in shake duration-300">
            <Icon icon="solar:danger-circle-bold" className="text-xl shrink-0" />
            <span className="text-sm font-bold">{serverError}</span>
          </div>
        )}

    

        <div className="relative my-6 flex items-center">
           <div className="flex-1 border-t mt-2 mb-2 border-brand-sky/20"></div>  </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label={tAuth("emailLabel")}
            placeholder={tAuth("emailPlaceholder")}
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            leftIcon="solar:letter-linear"
            fullWidth
            required
            autoComplete="email"
            className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
          />

          <div className="space-y-2">
            <Input
              type="password"
              label={tAuth("passwordLabel")}
              placeholder={tAuth("passwordPlaceholder")}
              value={formData.password}
              onChange={handleChange("password")}
              error={errors.password}
              leftIcon="solar:lock-password-linear"
              fullWidth
              required
              autoComplete="current-password"
              className="bg-white/50 dark:bg-brand-navy/50 backdrop-blur-sm"
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-brand-orange hover:text-brand-orange-dark text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded"
              >
                {tAuth("forgotPassword")}
              </Link>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-5 h-5 border-2 border-brand-sky/40 rounded-md peer-checked:bg-brand-orange peer-checked:border-brand-orange transition-all duration-200"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-brand-navy/70 dark:text-white/70 group-hover:text-brand-navy dark:group-hover:text-white transition-colors font-medium">
                {tAuth("rememberMe")}
              </span>
            </label>
          </div>

          <PremiumButton
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4 font-bold text-lg h-12 shadow-soft-hover"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              tAuth("signInButton")
            )}
          </PremiumButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-brand-navy/60 dark:text-white/60 text-sm font-medium">
            {tAuth("noAccount")}{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-brand-orange hover:text-brand-orange-dark font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 rounded border-b-2 border-brand-orange/20 hover:border-brand-orange"
            >
              {tAuth("signUpButton")}
            </button>
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
