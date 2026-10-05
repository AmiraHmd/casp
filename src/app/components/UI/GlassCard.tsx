import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hoverEffect = false 
}) => {
  return (
    <div 
      className={`
        relative overflow-hidden
        bg-brand-navy/30 dark:bg-white/10 backdrop-blur-2xl
        border border-white/10 dark:border-white/5
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
        rounded-3xl
        ${hoverEffect ? 'transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20' : ''}
        ${className || ''}
      `}
    >
      {/* Noise texture overlay (optional) */}
      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none mix-blend-overlay"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle shine effect */}
      <div className="absolute top-0 end-0 -mt-20 -me-20 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 start-0 -mb-20 -ms-20 w-80 h-80 bg-brand-navy/40 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default GlassCard;
