import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	"inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none transition-colors",
	{
		variants: {
			variant: {
				default: 'border-transparent bg-accent text-accent-foreground',
				violet: 'border-transparent bg-accent text-accent-foreground',
				success: 'border-transparent bg-success/12 text-success',
				secondary: 'border-transparent bg-secondary text-secondary-foreground',
				outline: 'border-border bg-background text-muted-foreground',
				destructive: 'border-transparent bg-destructive/10 text-destructive',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

function Badge({ className, variant, asChild = false, ...props }) {
	const Comp = asChild ? Slot : 'span';

	return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
