import React from 'react';

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const AdminCard: React.FC<AdminCardProps> = ({ 
  children, 
  className,
  hoverEffect = false 
}) => {
  return (
    <div 
      className={`
        relative overflow-hidden
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        shadow-sm
        rounded-xl
        ${hoverEffect ? 'transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600' : ''}
        ${className || ''}
      `}
    >
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AdminCard;
