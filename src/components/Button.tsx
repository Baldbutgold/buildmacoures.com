import React from 'react';
import { ButtonProps } from '../types';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50 focus:ring-orange-500'
  };
  
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