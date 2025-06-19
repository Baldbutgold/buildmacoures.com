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
    primary: 'bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white hover:from-brand-purple-dark hover:to-brand-purple-deep focus:ring-brand-purple shadow-purple hover:shadow-purple-lg',
    secondary: 'bg-brand-black text-brand-purple border-2 border-brand-purple hover:bg-brand-purple hover:text-white focus:ring-brand-purple shadow-md hover:shadow-purple',
    outline: 'border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white focus:ring-brand-purple shadow-md hover:shadow-purple'
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