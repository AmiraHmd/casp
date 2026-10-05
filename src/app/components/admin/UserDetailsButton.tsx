"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { UserDetailsModal } from "./UserDetailsModal";

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

interface UserDetailsButtonProps {
  user: AdminUser;
}

export function UserDetailsButton({ user }: UserDetailsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-white transition-colors"
        title="View User Details"
      >
        <Icon icon="solar:eye-bold-duotone" width={18} />
      </button>

      {isOpen && (
        <UserDetailsModal user={user} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
