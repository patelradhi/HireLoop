import { Badge } from './badge';
import { MapPinIcon, BadgeDollarSign } from 'lucide-react';

const SAMPLE_JOBS = [
	{ initial: 'A', color: 'bg-violet-500', company: 'Acme', role: 'Senior Frontend Engineer', location: 'Remote', salary: '₹40–60L' },
	{ initial: 'M', color: 'bg-pink-500', company: 'Meta', role: 'Product Designer', location: 'Bangalore', salary: '₹50L+' },
	{ initial: 'S', color: 'bg-blue-500', company: 'Stripe', role: 'Backend Engineer', location: 'Remote', salary: '₹45–70L' },
	{ initial: 'N', color: 'bg-emerald-500', company: 'Nova', role: 'Growth Marketer', location: 'Mumbai', salary: '₹25–35L' },
];

function MiniJobCard({ job, className = '' }) {
	return (
		<div className={`glass w-64 rounded-2xl p-4 shadow-xl shadow-violet-500/10 ${className}`}>
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className={`grid h-10 w-10 place-items-center rounded-xl text-base font-bold text-white ${job.color}`}>
						{job.initial}
					</div>
					<p className="text-sm font-semibold text-foreground">{job.company}</p>
				</div>
				<Badge variant="success">Hiring</Badge>
			</div>
			<p className="mt-3 font-bold leading-snug text-foreground">{job.role}</p>
			<div className="mt-3 flex flex-wrap gap-2">
				<Badge variant="outline">
					<MapPinIcon /> {job.location}
				</Badge>
				<Badge variant="violet">
					<BadgeDollarSign /> {job.salary}
				</Badge>
			</div>
		</div>
	);
}

function FloatingJobCards() {
	return (
		<div className="w-full">
			{/* Desktop / tablet — floating tilted collage */}
			<div className="relative mx-auto hidden h-[420px] max-w-4xl sm:block">
				<div className="absolute left-[6%] top-2 animate-float" style={{ animationDelay: '0s' }}>
					<div className="rotate-[-5deg]">
						<MiniJobCard job={SAMPLE_JOBS[0]} />
					</div>
				</div>
				<div className="absolute right-[8%] top-0 animate-float" style={{ animationDelay: '0.8s' }}>
					<div className="rotate-[4deg]">
						<MiniJobCard job={SAMPLE_JOBS[1]} />
					</div>
				</div>
				<div className="absolute bottom-4 left-[16%] animate-float" style={{ animationDelay: '1.6s' }}>
					<div className="rotate-[3deg]">
						<MiniJobCard job={SAMPLE_JOBS[2]} />
					</div>
				</div>
				<div className="absolute bottom-2 right-[18%] animate-float" style={{ animationDelay: '0.4s' }}>
					<div className="rotate-[-4deg]">
						<MiniJobCard job={SAMPLE_JOBS[3]} />
					</div>
				</div>
			</div>

			{/* Mobile — simple stacked cards */}
			<div className="mx-auto flex max-w-xs flex-col gap-4 sm:hidden">
				<div className="animate-float rotate-[-3deg]">
					<MiniJobCard job={SAMPLE_JOBS[0]} className="w-full" />
				</div>
				<div className="animate-float rotate-[3deg]" style={{ animationDelay: '0.8s' }}>
					<MiniJobCard job={SAMPLE_JOBS[1]} className="w-full" />
				</div>
			</div>
		</div>
	);
}

export default FloatingJobCards;
