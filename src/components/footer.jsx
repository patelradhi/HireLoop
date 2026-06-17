import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import Logo from '@/components/ui/logo';

const SOCIALS = [
	{ icon: Github, href: 'https://github.com/patelradhi/HireLoop', label: 'GitHub' },
	{ icon: Linkedin, href: 'https://www.linkedin.com/in/patelradhi', label: 'LinkedIn' },
];

function Footer() {
	return (
		<footer className="mt-24 border-t border-white/40 bg-white/30 backdrop-blur-md">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 text-sm text-muted-foreground sm:flex-row">
				<div className="flex items-center gap-2">
					<Logo className="text-lg" />
					<span>© 2026</span>
				</div>

				<div className="flex items-center gap-6">
					<Link to="#" className="transition-colors hover:text-primary">
						Privacy
					</Link>
					<Link to="#" className="transition-colors hover:text-primary">
						Terms
					</Link>
					<Link to="#" className="transition-colors hover:text-primary">
						Contact
					</Link>
				</div>

				<div className="flex gap-3">
					{SOCIALS.map(({ icon: Icon, href, label }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noreferrer noopener"
							aria-label={label}
							className="grid h-8 w-8 place-items-center rounded-full border border-white/50 bg-white/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
						>
							<Icon className="size-4" />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}

export default Footer;
