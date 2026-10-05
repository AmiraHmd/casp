import React from 'react';
// import { cn } from '@/utils/cn'; // unused currently

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  glow?: boolean;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  glow = true,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-dark disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-navy hover:brightness-110 active:scale-[0.98] border border-white/20 shadow-soft-lg",
    secondary: "bg-transparent border border-brand-navy/20 text-brand-navy hover:bg-brand-sky/10 hover:border-brand-navy/50 active:scale-[0.98] dark:text-white dark:border-white/30 dark:hover:bg-white/10",
    ghost: "bg-transparent text-brand-navy/80 hover:text-brand-navy hover:bg-brand-sky/5 active:scale-[0.98] dark:text-white/80 dark:hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-6 py-3 text-base rounded-full",
    lg: "px-8 py-4 text-lg rounded-full"
  };

  const glowStyles = (variant === 'primary' && glow) 
    ? "shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]" 
    : "";

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${glowStyles} 
        ${className || ''}
      `}
      {...props}
    >
      {/* Glossy overlay for primary */}
      {variant === 'primary' && (
        <div className="absolute inset-x-0 top-0 h-[50%] bg-linear-to-b from-white/20 to-transparent pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default PremiumButton;
