import React from 'react';
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { updateApplicationStatus } from '@/api/apiApplication';

// Map an application status to a themed badge variant.
const statusVariant = {
	hired: 'success',
	rejected: 'destructive',
	interviewing: 'violet',
	applied: 'outline',
};

function ApllicationCard({ application, isCandidate = false }) {
	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = application?.resume;
		link.target = '_blank';
		link.click();
	};

	const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(updateApplicationStatus, {
		application_id: application.id,
	});

	const handleStatusChange = (status) => {
		fnHiringStatus(status);
	};

	return (
		<Card className="rounded-2xl border-border/70 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
			<CardHeader>
				<CardTitle className="flex items-center justify-between gap-3 text-base font-bold tracking-tight">
					<span className="leading-snug">
						{isCandidate
							? `${application?.job?.title} at ${application?.job?.company?.name}`
							: application?.name}
					</span>
					<Button
						variant="outline"
						size="icon"
						className="shrink-0 hover:border-primary/40 hover:text-primary"
						onClick={handleDownload}
						aria-label="Download resume"
					>
						<Download size={16} />
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap gap-2">
					<Badge variant="outline">
						<BriefcaseBusiness /> {application?.experience} yrs experience
					</Badge>
					<Badge variant="outline">
						<School /> {application?.education}
					</Badge>
					<Badge variant="outline">
						<Boxes /> {application?.skills}
					</Badge>
				</div>
			</CardContent>
			<CardFooter className="flex items-center justify-between border-t border-border/60 pt-4">
				<span className="text-xs text-muted-foreground">
					{new Date(application?.created_at).toLocaleString()}
				</span>
				{isCandidate ? (
					<Badge variant={statusVariant[application.status] || 'secondary'} className="capitalize">
						{application.status}
					</Badge>
				) : (
					<Select onValueChange={handleStatusChange} defaultValue={application.status}>
						<SelectTrigger className="w-52 rounded-full">
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
