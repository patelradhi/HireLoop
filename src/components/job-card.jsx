import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, MapPinIcon, Trash2Icon, BriefcaseBusiness, BadgeDollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { savedJobs } from '@/api/apijobs';
import { useUser } from '@clerk/clerk-react';
import { deleteJob } from '@/api/apijobs';

const JobCard = ({ job, isMyJob = false, isMySavedJob = false, onJobSaved = () => {} }) => {
	const { user } = useUser();
	const [saved, setSaved] = React.useState(isMySavedJob);
	const [isVisible, setIsVisible] = React.useState(true);

	// for saving job
	const { loading: loadingSavedJob, data: savedJob, fn: fnSavedJob } = useFetch(savedJobs, { alreadySaved: saved });
	const handelSavedJob = async () => {
		await fnSavedJob({
			job_id: job.id,
			user_id: user.id,
		});
		setSaved((prev) => !prev);
		onJobSaved();
	};

	// for deleting job
	const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
		job_id: job.id,
	});

	const handleDeleteJob = async () => {
		await fnDeleteJob();

		setIsVisible(false);
		onJobSaved();
	};
	// Don’t render if not visible
	if (!isVisible) return null;

	const blurb = job.description?.substring(0, job.description.indexOf('.')) || 'No description available.';

	return (
		<Card className="group flex h-full flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/70 hover:shadow-2xl hover:shadow-violet-500/15 dark:hover:bg-white/10">
			<CardHeader className="gap-3">
				<div className="flex items-center justify-between gap-3">
					{job.company?.logo_url ? (
						<img src={job.company.logo_url} alt={job.company?.name || 'company'} className="h-7 w-auto object-contain" />
					) : (
						<span className="text-sm font-medium text-muted-foreground">{job.company?.name}</span>
					)}
					{job.isOpen === false ? (
						<Badge variant="destructive">Closed</Badge>
					) : (
						<Badge variant="success">Actively hiring</Badge>
					)}
				</div>
				<CardTitle className="text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
					{job.title}
				</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col gap-4">
				<div className="flex flex-wrap gap-2">
					<Badge variant="outline">
						<MapPinIcon /> {job.location}
					</Badge>
					{job.salary && (
						<Badge variant="violet">
							<BadgeDollarSign /> {job.salary}
						</Badge>
					)}
					{job.equity && (
						<Badge variant="violet">
							<BriefcaseBusiness /> {job.equity} equity
						</Badge>
					)}
				</div>
				<p className="text-sm leading-relaxed text-muted-foreground">{blurb}</p>
			</CardContent>

			<CardFooter className="mt-auto flex items-center gap-3">
				<Link to={`/job/${job.id}`} className="flex-1">
					<Button variant="blue" className="w-full">
						More Details
					</Button>
				</Link>
				{isMyJob ? (
					<Button
						variant="outline"
						size="icon"
						className="text-destructive hover:bg-destructive/10 hover:text-destructive"
						onClick={handleDeleteJob}
						disabled={loadingDeleteJob}
					>
						<Trash2Icon size={18} />
					</Button>
				) : (
					<Button variant="outline" size="icon" onClick={handelSavedJob} disabled={loadingSavedJob}>
						{saved ? (
							<Heart size={18} fill="currentColor" className="text-destructive" />
						) : (
							<Heart size={18} />
						)}
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default JobCard;
