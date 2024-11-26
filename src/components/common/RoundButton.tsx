import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const roundButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        active: 'text-sky-500 hover:bg-accent',
      },
      size: {
        default: 'h-9 w-9',
        sm: 'h-8 w-8 text-xs',
        lg: 'h-9 w-32',
      },
      bgColor: {
        default: '',
        white: 'bg-white',
        green: 'bg-green-4',
        blue: 'bg-blue-4',
        red: 'bg-red-4',
        // 필요한 색상을 추가할 수 있습니다.
      },
      rounded: {
        default: 'rounded-full',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
      },
      width: {
        auto: '',
        full: 'w-full',
        half: 'w-1/2',
        quarter: 'w-1/4',
        fixed130px: 'w-[130px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      bgColor: 'default',
      rounded: 'default',
    },
  }
);

export interface RoundButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof roundButtonVariants> {
  asChild?: boolean;
}

const RoundButton = React.forwardRef<HTMLButtonElement, RoundButtonProps>(
  ({ className, variant, size, bgColor, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(roundButtonVariants({ variant, size, bgColor, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
RoundButton.displayName = 'RoundButton';

export { RoundButton, roundButtonVariants };