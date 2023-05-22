import React from 'react';
import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { buttonVariants } from './button';

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

const LinkAsButton = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, href, variant, size, ...props }, ref) => {
    if (href === undefined) {
      return null;
    }
    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        href={href}
        {...props}
      />
    );
  },
);
LinkAsButton.displayName = 'LinkAsButton';

export default LinkAsButton;
