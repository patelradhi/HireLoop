import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

/**
 * Reusable back button for sub-pages.
 * Pass `to` for a fixed destination, otherwise it goes to the previous page.
 */
function BackButton({ to, label = 'Back', className }) {
	const navigate = useNavigate();

	const handleClick = () => {
		if (to) navigate(to);
		else navigate(-1);
	};

	return (
		<Button
			type="button"
			variant="ghost"
			onClick={handleClick}
			className={cn('-ml-2 mb-4 text-muted-foreground hover:text-foreground', className)}
		>
			<ArrowLeft size={18} />
			{label}
		</Button>
	);
}

export default BackButton;
