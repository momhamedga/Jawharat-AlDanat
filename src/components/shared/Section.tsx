import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article';
  spacing?: 'default' | 'compact' | 'generous' | 'none';
}

export function Section({
  as: Component = 'section',
  spacing = 'default',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        'relative w-full overflow-hidden',
        spacing === 'default' && 'py-16 md:py-24',
        spacing === 'compact' && 'py-10 md:py-16',
        spacing === 'generous' && 'py-24 md:py-32',
        spacing === 'none' && 'py-0',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
