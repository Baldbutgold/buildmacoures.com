import React from 'react';
import { SectionProps } from '../types';

export const Container = ({ className = '', children }: SectionProps) => {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};