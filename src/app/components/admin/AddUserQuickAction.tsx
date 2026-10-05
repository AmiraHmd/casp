"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { AddUserModal } from "./AddUserModal";

interface AddUserQuickActionProps {
  label: string;
}

export function AddUserQuickAction({ label }: AddUserQuickActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors flex flex-col items-center justify-center gap-2 group border border-sky-100 dark:border-sky-800"
      >
        <div className="w-10 h-10 rounded-full bg-brand-navy dark:bg-white text-white dark:text-brand-navy flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
          <Icon icon="solar:user-plus-bold-duotone" width={20} />
        </div>
        <span className="font-semibold text-slate-700 dark:text-white text-sm">
          {label}
        </span>
      </button>

      {isOpen && <AddUserModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
