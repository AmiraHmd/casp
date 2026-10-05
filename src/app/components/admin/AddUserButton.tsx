"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { AddUserModal } from "./AddUserModal";

export function AddUserButton({ label }: { label: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-navy dark:bg-white text-white dark:text-brand-navy font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
      >
        <Icon icon="solar:user-plus-bold" width={20} />
        <span>{label}</span>
      </button>

      {isOpen && <AddUserModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
