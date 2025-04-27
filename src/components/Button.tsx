import React from 'react';
import { ButtonProps } from '../types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: ButtonProps) => {
  // Revert to original base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Revert to original variant classes (using the desired blue for primary/secondary)
  const variantClasses = {
    primary: 'bg-[rgb(68,177,255)] text-white hover:bg-blue-600 focus:ring-blue-500', // Use specific blue
    secondary: 'bg-[rgb(68,177,255)] text-white hover:bg-blue-600 focus:ring-blue-500', // Use specific blue
    outline: 'border-2 border-[rgb(68,177,255)] text-[rgb(68,177,255)] hover:bg-blue-50 focus:ring-blue-500' // Use specific blue
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