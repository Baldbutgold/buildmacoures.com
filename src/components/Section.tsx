import React from 'react';
import { SectionProps } from '../types';
import { Container } from './Container';

export const Section = ({ className = '', children }: SectionProps) => {
  return (
    <section className={`py-12 md:py-16 lg:py-20 ${className}`}>
      <Container>
        {children}
      </Container>
    </section>
  );
};