export type NavItem = {
  label: string;
  href: string;
  isRoute?: boolean;
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
  id?: string;
};

export type CheckItem = {
  text: string;
  positive?: boolean;
};

export type ProcessStep = {
  title: string;
  description: string;
  number: number;
  icon?: React.ComponentType<any>;
};

export type BenefitItem = {
  text: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
};