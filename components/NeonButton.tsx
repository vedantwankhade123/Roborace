
import React from 'react';

interface ModernButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false
}) => {
  const baseStyles = "px-8 py-3 rounded-lg font-semibold text-xs uppercase tracking-widest transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-600/20",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline: "bg-transparent border-2 border-sky-600 text-sky-600 hover:bg-sky-50"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ModernButton;
