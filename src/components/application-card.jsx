import React from 'react';
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { updateApplicationStatus } from '@/api/apiApplication';

function ApllicationCard({ application, isCandidate = false }) {
	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = application?.resume;
		link.target = '_blank';
		link.click();
	};

	const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(updateApplicationStatus, {
		job_id: application.job_id,
	});

	const handleStatusChange = (status) => {
		fnHiringStatus(status).then(() => fnHiringStatus());
	};

	return (
		<Card className="m-8 p-2 rounded-md shadow-md text-sm">
			<CardHeader>
				<CardTitle className="flex justify-between items-center text-base font-semibold pt-2">
					{isCandidate
						? `${application?.job?.title} at ${application?.job?.company?.name}`
						: application?.name}
					<Download
						size={16}
						className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer "
						onClick={handleDownload}
					/>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4 flex-1">
				<div className="flex flex-col md:flex-row justify-between">
					<div className="flex gap-1 items-center">
						<BriefcaseBusiness size={15} /> {application?.experience} years of experience
					</div>
					<div className="flex gap-1 items-center">
						<School size={15} />
						{application?.education}
					</div>
					<div className="flex gap-1 items-center">
						<Boxes size={15} /> Skills: {application?.skills}
					</div>
				</div>
				<hr />
			</CardContent>
			<CardFooter className="flex justify-between">
				<span>{new Date(application?.created_at).toLocaleString()}</span>
				{isCandidate ? (
					<span className="capitalize font-bold">Status: {application.status}</span>
				) : (
					<Select onValueChange={handleStatusChange} defaultValue={application.status}>
						<SelectTrigger className="w-52">
							<SelectValue placeholder="Application Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="applied">Applied</SelectItem>
							<SelectItem value="interviewing">Interviewing</SelectItem>
							<SelectItem value="hired">Hired</SelectItem>
							<SelectItem value="rejected">Rejected</SelectItem>
						</SelectContent>
					</Select>
				)}
			</CardFooter>
		</Card>
	);
}

export default ApllicationCard;
