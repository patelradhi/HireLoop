import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { savedJobs } from '@/api/apijobs';
import { useUser } from '@clerk/clerk-react';
import { deleteJob } from '@/api/apijobs';

const JobCard = ({ job, isMyJob = false, isMySavedJob = false, onJobSaved = () => {} }) => {
	const { user } = useUser();
	const [saved, setSaved] = React.useState(isMySavedJob);

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
		onJobSaved();
	};

	return (
		<Card className="flex flex-col gap-1 w-[370px] mx-auto ">
			<CardHeader className="flex justify-between">
				<CardTitle className="flex justify-between font-bold pb-4">{job.title}</CardTitle>
				{isMyJob && (
					<Trash2Icon
						fill="red"
						size={20}
						className="text-red-300 cursor-pointer"
						onClick={handleDeleteJob}
					/>
				)}
			</CardHeader>
			<CardContent className="flex flex-col gap-4 flex-1">
				<div className="flex justify-between">
					{job.company && <img src={job.company.logo_url} alt="company logo" className="h-6" />}

					<div className="flex gap-2 items-center">
						<MapPinIcon size={15} className="text-gray-300 mr-2" />
						{job.location}
					</div>
				</div>
				<hr />
				{job.description?.substring(0, job.description.indexOf('.')) || 'No description available.'}
			</CardContent>

			<CardFooter className="flex justify-between ">
				<Link to={`/job/${job.id}`}>
					<Button variant="secondary" className="w-full">
						More Details
					</Button>
				</Link>

				{!isMyJob && (
					<Button variant="outline" className="w-15" onClick={handelSavedJob} disabled={loadingSavedJob}>
						{saved ? <Heart size={20} fill="red" stroke="red" /> : <Heart size={20} />}
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};

export default JobCard;
