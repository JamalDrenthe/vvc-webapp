import React from 'react';
import { Loader } from 'lucide-react';

export const Button = ({ children, variant = 'primary', size = 'md', isLoading, className = '', disabled, ...props }: any) => {
  const variants: any = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
    secondary: "bg-gold-500 text-white hover:bg-gold-600 shadow-sm",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };
  const sizes: any = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};

export const Card = ({ children, className = '', onClick }: any) => (
  <div onClick={onClick} className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
);

export const Input = ({ label, error, icon, className = '', ...props }: any) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
    <div className="relative">
      {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">{icon}</div>}
      <input
        className={`block w-full rounded-lg border ${error ? 'border-red-300' : 'border-slate-300 focus:ring-brand-500'} ${icon ? 'pl-10' : 'pl-3'} py-2 text-sm focus:outline-none focus:ring-1 transition-all ${className}`}
        {...props}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

export const Badge = ({ children, variant = 'neutral', className = '' }: any) => {
  const variants: any = {
    neutral: 'bg-slate-100 text-slate-700',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>{children}</span>;
};

export const ProgressBar = ({ progress, colorClass = 'bg-brand-600' }: any) => (
  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
    <div
      className={`${colorClass} h-full rounded-full transition-all duration-500 ease-out`}
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    ></div>
  </div>
);