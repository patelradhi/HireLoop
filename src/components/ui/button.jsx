import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-primary/40',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				// electric-violet primary CTA
				blue: 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5',
				// premium near-black secondary CTA
				red: 'bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:-translate-y-0.5 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100',
			},
			size: {
				default: 'h-9 px-5 py-2 has-[>svg]:px-3.5',
				sm: 'h-8 gap-1.5 px-4 has-[>svg]:px-2.5',
				lg: 'h-11 px-7 has-[>svg]:px-5',
				icon: 'size-9',
				//custum
				xl: 'h-14 sm:h-16 px-14 text-lg sm:text-xl font-bold',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

function Button({ className, variant, size, asChild = false, ...props }) {
	const Comp = asChild ? Slot : 'button';

	return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
