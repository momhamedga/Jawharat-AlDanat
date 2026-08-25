import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'wide' | 'reading';
}

export function Container({
  className,
  variant = 'default',
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        variant === 'default' && 'max-w-7xl',
        variant === 'wide' && 'max-w-[1440px] lg:px-12',
        variant === 'reading' && 'max-w-3xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
