'use client';

import * as React from 'react';

import { cn } from '../../lib/utils';

export interface FixedToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const FixedToolbar = React.forwardRef<HTMLDivElement, FixedToolbarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center gap-1 border-b border-input bg-background p-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FixedToolbar.displayName = 'FixedToolbar';
