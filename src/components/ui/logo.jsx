import { cn } from '@/lib/utils';

/**
 * HireLoop wordmark — clean typographic logo, one violet accent.
 * Size is controlled by the parent's font-size (pass text-* via className).
 */
function Logo({ className }) {
	return (
		<span className={cn('font-extrabold tracking-tighter text-foreground select-none', className)}>
			Hire<span className="text-primary">Loop</span>
		</span>
	);
}

export default Logo;
