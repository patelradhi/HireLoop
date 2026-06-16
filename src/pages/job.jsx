import React from 'react';
import { getSingleJob } from '@/api/apijobs';
import { useUser } from '@clerk/clerk-react';
import { MapPin } from 'lucide-react';
import { Briefcase } from 'lucide-react';
import { DoorClosed, DoorOpen } from 'lucide-react';
import useFetch from '@/hooks/use-fetch';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import MDEditor from '@uiw/react-md-editor';
import { updateHiringStatus } from '@/api/apijobs';
import { ApplyJobDrawer } from '@/components/ui/apply-job';
import ApplicationCard from '@/components/application-card';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/ui/back-button';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function JobPage() {
	const { isLoaded, user } = useUser();
	const { id } = useParams();
	console.log(user, 'user');

	// this if for fetching job
	const { data: job, loading: loadingJob, fn: fnJob } = useFetch(getSingleJob, { job_id: id });
	console.log(job, 'job');

	useEffect(() => {
		if (isLoaded) {
			fnJob();
		}
	}, [isLoaded]);

	// this if for updating job
	const {
		data: hiringData,
		loading: loadingHiringStatus,
		fn: fnHiringStatus,
	} = useFetch(updateHiringStatus, {
		job_id: id,
	});

	const handleStatusChange = async (value) => {
		const isOpen = value === 'open';
		fnHiringStatus(isOpen).then(() => fnJob());
	};

	if (!isLoaded || loadingJob || !job) {
		return <BarLoader className="mb-4" width={'100%'} color="#6d5ef8" />;
	}

	return (
		<div className="mx-auto max-w-4xl pt-6">
			<BackButton to="/jobs" label="Back to jobs" />
			<div className="glass flex flex-col gap-6 rounded-[2rem] p-6 sm:p-10">
			<div className="flex flex-col-reverse gap-6 md:flex-row justify-between md:items-center">
				<h1 className="gradient-title font-bold text-4xl sm:text-6xl tracking-tighter">{job.title}</h1>
				{job?.company?.logo_url && (
					<img src={job.company.logo_url} alt={job.title} className="h-12 w-auto object-contain" />
				)}
			</div>
			<div className="flex flex-wrap gap-2">
				<Badge variant="outline" className="text-sm">
					<MapPin /> {job?.location}
				</Badge>
				<Badge variant="outline" className="text-sm">
					<Briefcase /> {job?.applications?.length} Applicants
				</Badge>
				{job?.isOpen ? (
					<Badge variant="success" className="text-sm">
						<DoorOpen /> Open
					</Badge>
				) : (
					<Badge variant="destructive" className="text-sm">
						<DoorClosed /> Closed
					</Badge>
				)}
			</div>
			{job?.recruiter_id === user?.id && (
				<Select onValueChange={handleStatusChange}>
					<SelectTrigger
						className={`w-full !rounded-full !text-white ${job?.isOpen ? '!bg-success' : '!bg-destructive'}`}
					>
						{' '}
						<SelectValue placeholder={'Hiring Status ' + (job?.isOpen ? '( Open )' : '( Closed )')} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="open">Open</SelectItem>
						<SelectItem value="closed">Closed</SelectItem>
					</SelectContent>
				</Select>
			)}
			<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">About the job</h2>
			<p className="leading-relaxed text-muted-foreground sm:text-lg">{job?.description}</p>
			<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What we are looking for</h2>
			<MDEditor.Markdown
				source={job?.requirements}
				style={{ backgroundColor: 'transparent' }}
				className="sm:text-lg mt-0"
			/>
			{/*renderapplications*/}
			{job?.recruiter_id !== user?.id && (
				<ApplyJobDrawer
					job={job}
					user={user}
					fetchJob={fnJob}
					applied={job.applications.find((x) => x.candidate_id === user.id)}
				/>
			)}
			{loadingHiringStatus && <BarLoader width={'100%'} color="#6d5ef8" />}
			{/*renderapplications*/}
			{job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-bold tracking-tight">Applications</h2>
					{job?.applications.map((application) => {
						return <ApplicationCard key={application.id} application={application} />;
					})}
				</div>
			)}
			</div>
		</div>
	);
}

export default JobPage;
