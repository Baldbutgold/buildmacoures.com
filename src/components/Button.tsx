import React from 'react';
import { ButtonProps } from '../types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-0.5 active:translate-y-0';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-brand-blue to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-brand-blue shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-brand-blue border-2 border-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue shadow-md hover:shadow-lg',
    outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue shadow-md hover:shadow-lg'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};