export type NavItem = {
  label: string;
  href: string;
};

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
};

export type SectionProps = {
  className?: string;
  children: React.ReactNode;
};

export type CheckItem = {
  text: string;
  positive?: boolean;
};

export type ProcessStep = {
  title: string;
  description: string;
  number: number;
};

export type BenefitItem = {
  text: string;
};