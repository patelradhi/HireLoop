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
		return <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />;
	}

	return (
		<div className="flex flex-col gap-6 mt-5 ml-2">
			<div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
				<h1 className="gradient-title font-bold pb-3 text-4xl sm:text-6xl"> {job.title}</h1>
				<img src={job?.company?.logo_url} alt={job.title} className="h-12 mr-10" />
			</div>
			<div className="flex justify-between ">
				<div className="flex gap-2">
					<MapPin />
					{job?.location}
				</div>
				<div className="flex gap-2">
					<Briefcase /> {job?.applications?.length} Applicants
				</div>

				<div className="flex gap-2 mr-10">
					{job?.isOpen ? (
						<>
							<DoorOpen /> Open
						</>
					) : (
						<>
							<DoorClosed /> Closed
						</>
					)}
				</div>
			</div>
			{job?.recruiter_id === user?.id && (
				<Select onValueChange={handleStatusChange}>
					<SelectTrigger className={`w-full !bg-green-950 !text-white ${!job?.isOpen && '!bg-red-950'}`}>
						{' '}
						<SelectValue placeholder={'Hiring Status ' + (job?.isOpen ? '( Open )' : '( Closed )')} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="open">Open</SelectItem>
						<SelectItem value="closed">Closed</SelectItem>
					</SelectContent>
				</Select>
			)}
			<h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
			<p className="sm:text-lg">{job?.description}</p>
			<h2 className="text-xl sm:text-3xl font-bold ">What we are looking for</h2>
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
			{loadingHiringStatus && <BarLoader width={'100%'} color="#36d7b7" />}
			{/*renderapplications*/}
			{job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
				<div className="flex flex-col gap-2">
					<h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
					{job?.applications.map((application) => {
						return <ApplicationCard key={application.id} application={application} />;
					})}
				</div>
			)}
		</div>
	);
}

export default JobPage;
