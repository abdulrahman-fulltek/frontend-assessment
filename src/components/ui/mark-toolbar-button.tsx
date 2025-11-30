'use client';

import * as React from 'react';

import { cn } from '../../lib/utils';
import { usePlateEditor } from 'platejs/react';

export interface MarkToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  nodeType: string;
  tooltip?: string;
  children: React.ReactNode;
}

export const MarkToolbarButton = React.forwardRef<HTMLButtonElement, MarkToolbarButtonProps>(
  ({ className, nodeType, tooltip, children, ...props }, ref) => {
    const editor = usePlateEditor();

    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        editor?.getApi().toggleMark({ key: nodeType });
      },
      [editor, nodeType]
    );

    return (
      <button
        ref={ref}
        type="button"
        onMouseDown={handleMouseDown}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0',
          className
        )}
        title={tooltip}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MarkToolbarButton.displayName = 'MarkToolbarButton';
