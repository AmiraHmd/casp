"use client";

import { createPortal } from 'react-dom';
import React, { useState, Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { Input } from "@/app/components/UI";
import PremiumButton from "@/app/components/UI/PremiumButton";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { createUser } from '@/actions/admin';
import { Listbox, Transition } from '@headlessui/react';
import { countries, Country } from '@/data/countries';

export function AddUserModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const t = useTranslations("admin");
  const tAuth = useTranslations("auth");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    phoneCode: "+216",
  });

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<Country>(countries.find(c => c.dialCode === '+216') || countries[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = tAuth("firstNameRequired");
    if (!formData.lastName) newErrors.lastName = tAuth("lastNameRequired");
    if (!formData.email) {
      newErrors.email = tAuth("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = tAuth("invalidEmail");
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = tAuth("passwordLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await createUser({
        ...formData,
        phone: formData.phone ? `${formData.phoneCode}${formData.phone}` : undefined,
        country: selectedCountry?.name,
      });

      if (res?.error) {
        toast.error(res.error);
        setLoading(false);
      } else {
        toast.success(t("userCreatedSuccess") || "User created successfully");
        setLoading(false);
        onClose();
      }
    } catch {
      setLoading(false);
      toast.error(tAuth("errorGeneric"));
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      setMounted(false);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
        >
          <Icon icon="solar:close-circle-bold" width={28} />
        </button>

        <div className="flex items-center gap-3 mb-6 mt-10">
            <div className="w-12 h-12 rounded-xl bg-brand-navy/5 dark:bg-white/5 flex items-center justify-center text-brand-navy dark:text-white">
                <Icon icon="solar:user-plus-bold-duotone" width={28} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-brand-navy dark:text-white">
                {t("addUser")}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Create a new system user</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={tAuth("firstNameLabel")}
              placeholder={tAuth("firstNameLabel")}
              value={formData.firstName}
              onChange={handleChange("firstName")}
              error={errors.firstName}
              required
              fullWidth
            />
            <Input
              label={tAuth("lastNameLabel")}
              placeholder={tAuth("lastNameLabel")}
              value={formData.lastName}
              onChange={handleChange("lastName")}
              error={errors.lastName}
              required
              fullWidth
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr] gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                  {tAuth('phoneLabel')}
                </label>
                <div className="flex gap-2">
                  <Listbox value={selectedPhoneCountry} onChange={(c) => {
                    setSelectedPhoneCountry(c)
                    setFormData({ ...formData, phoneCode: c.dialCode })
                  }}>
                    <div className="relative">
                      <Listbox.Button className="h-[52px] flex items-center justify-center gap-2 px-2 border-2 border-brand-sky/20 hover:border-brand-orange/30 rounded-xl bg-white/50 dark:bg-brand-navy/50 transition-all outline-none">
                        <Icon icon={selectedPhoneCountry.flag} className="text-2xl pt-1" />
                        <span className="text-xs font-bold pt-1">{selectedPhoneCountry.dialCode}</span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-[110px] overflow-auto rounded-xl bg-white dark:bg-brand-navy-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {countries.map((country, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 px-2 ${
                                  active ? 'bg-brand-orange/10 text-brand-orange' : 'text-brand-navy dark:text-white'
                                }`
                              }
                              value={country}
                            >
                              <div className="flex items-center gap-2">
                                <Icon icon={country.flag} className="text-xl" />
                                <span className="text-xs font-bold">{country.dialCode}</span>
                              </div>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                  <div className="flex-1">
                    <input
                      type="tel"
                      placeholder={tAuth('phonePlaceholder')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-[52px] px-4 text-sm text-brand-navy bg-white/50 dark:bg-brand-navy/50 dark:text-white border-2 border-brand-sky/20 hover:border-brand-orange/30 rounded-xl transition-all outline-none placeholder:text-brand-navy/40 dark:placeholder:text-white/40 focus:ring-2 focus:ring-brand-orange"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-brand-navy dark:text-white mb-2">
                  {tAuth('countryLabel')}
                </label>
                <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                  <div className="relative">
                    <Listbox.Button className="w-full h-[52px] flex items-center gap-3 px-4 border-2 border-brand-sky/20 hover:border-brand-orange/30 rounded-xl bg-white/50 dark:bg-brand-navy/50 transition-all outline-none text-start pr-10">
                      {selectedCountry ? (
                        <>
                          <Icon icon={selectedCountry.flag} className="text-xl" />
                          <span className="text-sm truncate pt-1">{selectedCountry.code3}</span>
                        </>
                      ) : (
                        <span className="text-brand-navy/40 dark:text-white/40 text-sm">{tAuth('countryPlaceholder')}</span>
                      )}
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <Icon icon="solar:alt-arrow-down-linear" className="h-5 w-5 text-gray-400" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-brand-navy-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {countries.map((country, idx) => (
                          <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-4 pr-10 ${
                                active ? 'bg-brand-orange/10 text-brand-orange' : 'text-brand-navy dark:text-white'
                              }`
                            }
                            value={country}
                          >
                            <div className="flex items-center gap-3">
                              <Icon icon={country.flag} className="text-xl" />
                              <span className="text-sm">{country.code3}</span>
                            </div>
                            {selectedCountry?.code === country.code && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-orange">
                                <Icon icon="solar:check-read-linear" className="h-4 w-4" />
                              </span>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
          </div>

          <Input
            type="email"
            label={tAuth("emailLabel")}
            placeholder={tAuth("emailPlaceholder")}
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            leftIcon="solar:letter-linear"
            required
            fullWidth
          />

          <Input
            type="password"
            label={tAuth("passwordLabel")}
            placeholder={tAuth("passwordPlaceholder") + " (Default: 123456)"}
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
            leftIcon="solar:lock-password-linear"
            fullWidth
          />

          <div className="pt-2 flex gap-3">
             <button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                disabled={loading}
              >
                {t("close")}
              </button>
              <PremiumButton
                type="submit"
                variant="primary"
                className="flex-[2] font-bold h-12 shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {tAuth("processing") || "Processing..."}
                  </span>
                ) : (
                  t("addUser")
                )}
              </PremiumButton>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
