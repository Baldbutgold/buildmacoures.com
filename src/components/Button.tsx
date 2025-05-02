import React from 'react';
import { ButtonProps } from '../types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Use brand colors from config
  const variantClasses = {
    // Use brand-blue, hover slightly darker (using opacity for simplicity), focus ring blue
    primary: 'bg-brand-blue text-brand-white hover:bg-opacity-90 focus:ring-brand-blue',
    // Secondary also uses brand-blue
    secondary: 'bg-brand-blue text-brand-white hover:bg-opacity-90 focus:ring-brand-blue',
    // Outline uses brand-blue for border/text, hover white background
    outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-white focus:ring-brand-blue'
  };
  
  // Revert to original size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
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